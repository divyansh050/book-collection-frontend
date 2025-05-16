import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-400 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="text-yellow-400 hover:text-yellow-500 transition-all duration-200"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
