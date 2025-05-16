import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import Button from "../Components/Button";

function Home() {
  const { isLoggedIn, user } = useAuth(); // Access auth context
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {isLoggedIn ? (
        <div className="text-center">
          <h2
            title={`Welcome, ${user?.name}!`}
            className="line-clamp-1 text-3xl font-bold text-yellow-400"
          >
            Welcome, {user?.name}!
          </h2>
          <p className="text-gray-400 mt-4">
            Welcome to your Personal Library! 📚 Discover, manage, and expand
            your book collection effortlessly. Start exploring now!
          </p>
          <div className="mt-6">
            {/* Add Book Button */}

            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate("/addbook")}
            >
              Add Book
            </Button>

            {/* View Books Button */}

            <Button
              className="ml-4"
              size="lg"
              variant="ghost"
              onClick={() => navigate("/booklist")}
            >
              View Books
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-400">
            Welcome to the Book Collection App
          </h2>
          <p className="text-gray-400 mt-4">
            Please log in to manage your book collection. If you don't have an
            account,{" "}
            <Link
              to="/signup"
              className="text-yellow-400 hover:text-yellow-500 transition-all"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
