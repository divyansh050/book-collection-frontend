import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import axiosInstance, { createCancelableRequest } from "../api/axiosInstance";
import useRateLimiter from "../hooks/useRateLimiter";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });
  const { isBlocked, incrementAttempts } = useRateLimiter(3, 10000);
  const { login } = useAuth();

  const cancelController = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target || {};
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isBlocked) return;

    setStatus({ loading: true, error: "" });
    incrementAttempts();

    const { controller, signal } = createCancelableRequest();
    cancelController.current = controller;

    try {
      const response = await axiosInstance.post(
        "/login",
        { email: formData.email, password: formData.password },
        { signal }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      login(token);
    } catch (err) {
      if (err.name === "CanceledError") {
        console.log("Login request canceled");
      } else {
        setStatus({
          loading: false,
          error:
            err.response?.data?.message || "Signup failed. Please try again.",
        });
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cancelController.current) cancelController.current.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-2xl shadow-xl max-w-md space-y-6 w-full"
      >
        <h2 className="mb-0 text-2xl font-medium text-yellow-400 text-center tracking-wide">
          Welcome Back! Your Personal Book Collection Awaits.
        </h2>

        <p className="text-center text-sm text-gray-400 mt-2 mb-1">
          Sign In to Access and Manage Your Books
        </p>

        {/* Error Messages */}
        <div className="h-3 transition-all duration-300">
          {(status?.error || isBlocked) && (
            <p className="text-center text-red-500 text-sm mb-1">
              {isBlocked
                ? " Too many attempts. Please wait 10 seconds."
                : status?.error}
            </p>
          )}
        </div>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button
          className="w-full"
          variant="ghost"
          type="submit"
          disabled={status?.loading || isBlocked}
          loading={status?.loading}
        >
          Login
        </Button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-400 hover:text-yellow-500 transition-all duration-200"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
