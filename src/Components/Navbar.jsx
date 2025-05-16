import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-3 py-2 rounded-md transition-colors duration-300 hover:bg-yellow-500/20"
  >
    {children}
  </Link>
);

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  const handleLinkClick = useCallback(() => setIsMenuOpen(false), []);

  return (
    <nav className="min-h-[72px] bg-gray-900 text-yellow-400 w-full p-4 shadow-lg fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="text-xl font-bold">
          <Link to="/">Book Collection</Link>
        </div>

        <div className="block md:hidden">
          <button
            className={`text-yellow-400 text-2xl rounded-md p-1 hover:bg-yellow-600 focus:outline-none transition-transform duration-300 ${
              isMenuOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-label="Toggle Menu"
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
          >
            {isMenuOpen ? "X" : "☰"}
          </button>
        </div>

        <div
          ref={menuRef}
          className={`transition-all duration-500 ease-in-out transform ${
            isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden w-full md:hidden`}
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            {isLoggedIn ? (
              <>
                <NavLink to="/booklist" onClick={handleLinkClick}>
                  Book List
                </NavLink>
                <NavLink to="/addbook" onClick={handleLinkClick}>
                  Add Book
                </NavLink>
                <div
                  title={`Hello, ${user?.name}`}
                  className="text-yellow-400 truncate max-w-[200px]"
                >
                  Hello, {user?.name}
                </div>
                <Button
                  variant="danger"
                  onClick={() => {
                    logout();
                    handleLinkClick();
                  }}
                  className="px-3 py-2 rounded-md transition-colors duration-300 hover:bg-red-600/80"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={handleLinkClick}>
                  Login
                </NavLink>
                <NavLink to="/signup" onClick={handleLinkClick}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <NavLink to="/booklist">Book List</NavLink>
              <NavLink to="/addbook">Add Book</NavLink>
              <div
                title={`Hello, ${user?.name}`}
                className="text-yellow-400 truncate max-w-[200px]"
              >
                Hello, {user?.name}
              </div>
              <Button
                variant="underline"
                onClick={logout}
                className="px-3 py-2 rounded-md transition-colors duration-300 hover:bg-yellow-500/20"
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="flex space-x-4">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
