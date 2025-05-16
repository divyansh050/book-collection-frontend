import { Navigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";

// RouteGuard Component: Protects routes based on authentication status
const RouteGuard = ({
  children, // The component(s) to render if access is allowed
  isAllowed, // Boolean indicating if the user has access (e.g., logged-in status)
  loading, // Boolean indicating if authentication state is being checked (e.g., fetching user)
  navigateTo = "/login", // Default route to navigate if access is not allowed
}) => {
  // If authentication status is loading, show a loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is allowed, render the child components
  // If not, redirect to the specified navigateTo route (default is /login)
  return isAllowed ? children : <Navigate to={navigateTo} replace />;
};

export default RouteGuard;
