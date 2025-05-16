import { useContext, createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";

// Initial state used for auth status and UI flags
const initialState = {
  user: null, // User object when logged in
  isLoggedIn: false, // Boolean flag for login status
  loading: false, // Loading indicator for async operations
  error: false, // Error message or false if no error
  authReady: false, // Flag to indicate if auth state is initialized, prevents UI flickering
};

// Creating a reducer here for better redability
// -> Reducer function to handle auth state changes based on dispatched actions
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        authReady: true,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload || "Something went wrong",
        authReady: true,
      };
    case "AUTH_READY":
      return {
        ...state,
        authReady: true,
      };
    default:
      return state;
  }
};

// Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // On component mount, check if token exists and fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // not using await as all the loding and updating things are inside this function only
        fetchUserDetails();
      } catch (error) {
        console.error("Invalid token:", error);
        // Dispatch error action to update state with error message
        dispatch({ type: "ERROR", payload: "Invalid token" });
      }
    } else {
      // No token found, mark auth ready to prevent UI flicker
      dispatch({ type: "AUTH_READY" });
    }
  }, []);

  // Async function to fetch user profile data from backend
  const fetchUserDetails = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axiosInstance.get("/profile");
      if (response?.data) {
        // On success, dispatch login success with user data (email, name, id)
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response?.data
            ? {
                email: response.data.email,
                name: response.data.name,
                id: response.data._id,
              }
            : null,
        });
        // Redirect only if user is on login/signup page
        if (location.pathname === "/login" || location.pathname === "/signup") {
          navigate("/");
        }
      } else {
        // If data missing, dispatch error
        dispatch({ type: "ERROR", payload: "Response Data not available" });
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      // Handle 401/403 errors by dispatching error state
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch({ type: "ERROR", payload: "Failed to fetch user details" });
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "AUTH_READY" });
    }
  };

  // Login function - saves token and fetches user details
  const login = (token) => {
    localStorage.setItem("token", token);
    // this function is async but we are not using the await as we are not doing any process after that
    fetchUserDetails();
  };

  // Logout function - clears token and resets auth state
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
