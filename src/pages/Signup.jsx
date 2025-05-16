import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import Button from "../Components/Button";
import Input from "../Components/Input";
import axiosInstance, { createCancelableRequest } from "../api/axiosInstance";
import useRateLimiter from "../hooks/useRateLimiter";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState({ loading: false, error: "" });
  const { isBlocked, incrementAttempts } = useRateLimiter(3, 10000);
  const { login } = useAuth();
  const cancelController = useRef(null);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  const validateForm = useCallback(() => {
    if (formData.password !== formData.confirmPassword) {
      setStatus({ loading: false, error: "Passwords do not match" });
      return false;
    }
    return true;
  }, [formData.password, formData.confirmPassword, setStatus]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isBlocked) return;
    if (!validateForm()) return;

    setStatus({ loading: true, error: "" });
    incrementAttempts();

    const { controller, signal } = createCancelableRequest();
    cancelController.current = controller;

    try {
      const response = await axiosInstance.post(
        "/register",
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        },
        { signal }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      login(token);
    } catch (err) {
      if (err.name === "CanceledError") {
        console.log("Register request canceled");
      } else {
        setStatus({
          loading: false,
          error:
            err.response?.data?.message || "Signup failed. Please try again.",
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (cancelController.current) cancelController.current.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="mb-0 text-2xl font-medium text-yellow-400 text-center tracking-wide">
          Welcome to Your Personal Library
        </h2>

        <p className="text-center text-sm text-gray-400 mt-2 mb-1">
          Sign up and start curating your perfect book collection today.
        </p>

        <div className="h-3 transition-all duration-300">
          {(status.error || isBlocked) && (
            <p className="text-center text-red-500 text-sm mb-1">
              {isBlocked
                ? "Too many attempts. Please wait 10 seconds."
                : status.error}
            </p>
          )}
        </div>

        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <Button
          className="w-full"
          variant="ghost"
          type="submit"
          disabled={status.loading || isBlocked}
          loading={status?.loading}
        >
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-400 hover:text-yellow-500 transition-all duration-200"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
