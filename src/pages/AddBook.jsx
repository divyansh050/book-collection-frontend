import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Button from "../Components/Button";
import Input from "../Components/Input";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    year: "",
    description: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "year" && value > new Date().getFullYear()) return;
    setBook((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const books = JSON.parse(localStorage.getItem("books")) || [];

    if (books.some((b) => b.title === book.title)) {
      setMessage("Book already exists.");
      setLoading(false); // Stop loading
      return;
    }

    const newBook = { ...book, id: Date.now() };
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));

    setMessage("Book added successfully!");

    setTimeout(() => {
      setLoading(false); // Stop loading
      navigate("/booklist");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleAddBook}
        className="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-lg"
      >
        <h2 className="text-xl font-bold text-yellow-400 mb-4">
          Add a New Book
        </h2>

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

        <Input
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
          className="mb-3"
        />

        <Input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
          className="mb-3"
        />

        <Input
          name="year"
          type="number"
          placeholder="Published Year"
          value={book.year}
          onChange={handleChange}
          required
          className="mb-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full mb-3 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={book.description}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <Input
          name="imageUrl"
          type="url"
          placeholder="Image URL (Optional)"
          value={book.imageUrl}
          onChange={handleChange}
          className="mb-3"
        />

        <Button
          variant="ghost"
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading} // Disable when loading
          loading={loading}
        >
          Add Book
        </Button>
      </form>
    </div>
  );
}

export default AddBook;
