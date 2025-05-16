import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import BookCard from "../Components/BookCard";
import Button from "../Components/Button";

function BookList() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("card"); // ENUM "card" or "column"
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  // Load books from localStorage once on mount
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleDelete = useCallback(
    (id) => {
      const updatedBooks = books.filter((book) => book.id !== id);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
      setMessage("Book deleted successfully!");

      // Clear any existing timeout before setting a new one
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setMessage(""), 2000);
    },
    [books]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        Your Book Collection
      </h2>

      {/* View Mode Toggle */}
      <div className="mb-4 flex gap-2 justify-center">
        <Button
          onClick={() => setViewMode("card")}
          variant={viewMode === "card" ? "primary" : "ghost"}
        >
          Card View
        </Button>
        <Button
          onClick={() => setViewMode("column")}
          variant={viewMode === "column" ? "primary" : "ghost"}
        >
          Column View
        </Button>
      </div>

      {/* Reserve space for message with fixed height */}
      <p
        className="text-green-400 text-center mb-3"
        style={{
          minHeight: "1.5rem",
          visibility: message ? "visible" : "hidden",
        }}
      >
        {message || "\u00A0" /* non-breaking space to keep height */}
      </p>

      {books.length === 0 ? (
        <>
          <p className="text-yellow-400">
            No books in your collection. Add some!
          </p>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate("/addbook")}
            className="mt-2"
          >
            Add Book
          </Button>
        </>
      ) : (
        <div
          className={`grid gap-4 ${
            viewMode === "card" ? "grid-cols-1 md:grid-cols-4" : ""
          }`}
        >
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={() => handleDelete(book.id)}
              onEdit={() => navigate(`/editbook/${book.id}`)}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
