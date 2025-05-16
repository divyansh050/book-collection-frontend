import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="min-h-[72px] bg-gray-900 text-white w-full p-4 shadow-lg fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="text-xl font-bold text-yellow-400">
          <Link to="/">Book Collection</Link>
        </div>
        <div className="block md:hidden">
          <button
            className={`text-yellow-400 text-2xl transition-transform duration-300 rounded-md p-1 hover:bg-yellow-600 focus:outline-none ${
              isMenuOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "X" : "☰"}
          </button>
        </div>

        {/* Mobile Menu - Smooth Slide Animation */}
        <div
          className={`flex flex-col md:hidden items-center space-y-4 mt-2 w-full transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isLoggedIn ? (
            <>
              <Link
                to="/booklist"
                className="text-yellow-400 hover:text-yellow-500 transition-all"
              >
                Book List
              </Link>
              <Link
                to="/addbook"
                className="text-yellow-400 hover:text-yellow-500 transition-all"
              >
                Add book
              </Link>
              <div
                title={`Hello, ${user?.name}`}
                className="inline-block max-w-[200px] overflow-hidden text-ellipsis text-yellow-400"
              >
                Hello, {user?.name}
              </div>
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col space-y-4">
              <Link
                to="/login"
                className="text-yellow-400 hover:text-yellow-500 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-yellow-400 hover:text-yellow-500 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Menu - Only visible on medium and larger screens */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/booklist"
                className="text-yellow-400 hover:text-yellow-500 transition-all"
              >
                Book List
              </Link>
              <Link
                to="/addbook"
                className="text-yellow-400 hover:text-yellow-500 transition-all"
              >
                Add book
              </Link>
              <div
                title={`Hello, ${user?.name}`}
                className="inline-block max-w-[200px] overflow-hidden text-ellipsis text-yellow-400"
              >
                Hello, {user?.name}
              </div>
              <Button variant="underline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-yellow-400 hover:text-yellow-500 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-yellow-400 hover:text-yellow-500 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
