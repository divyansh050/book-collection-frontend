import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./Components/Navbar";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import { useAuth } from "./context/AuthContext";
import EditBook from "./pages/EditBook";
import ErrorPage from "./pages/ErrorPage";
import LoadingSpinner from "./Components/LoadingSpinner";
import RouteGuard from "./Components/RouteGuard";
import ErrorBoundary from "./ErrorBoundry";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const { authReady, isLoggedIn, loading } = useAuth();

  // Prevent rendering until auth is ready
  if (!authReady) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route
            element={
              <RouteGuard
                isAllowed={isLoggedIn}
                loading={loading}
                navigateTo="/login"
              >
                <BookList />
              </RouteGuard>
            }
            path="/booklist"
          />
          <Route
            element={
              <RouteGuard
                isAllowed={isLoggedIn}
                loading={loading}
                navigateTo="/login"
              >
                <EditBook />
              </RouteGuard>
            }
            path="/editbook/:id"
          />
          <Route
            element={
              <RouteGuard
                isAllowed={isLoggedIn}
                loading={loading}
                navigateTo="/login"
              >
                <AddBook />
              </RouteGuard>
            }
            path="/addbook"
          />
          <Route
            element={
              <RouteGuard
                isAllowed={!isLoggedIn}
                loading={loading}
                navigateTo="/"
              >
                <Login />
              </RouteGuard>
            }
            path="/login"
          />
          <Route
            element={
              <RouteGuard
                isAllowed={!isLoggedIn}
                loading={loading}
                navigateTo="/"
              >
                <Signup />
              </RouteGuard>
            }
            path="/signup"
          />

          {/* Catch-all route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
