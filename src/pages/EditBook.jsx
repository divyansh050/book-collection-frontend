import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../Components/Button";
import Input from "../Components/Input";
import LoadingSpinner from "../Components/LoadingSpinner";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    year: "",
    description: "",
    imageUrl: "",
  });
  const [initialBook, setInitialBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // Loading state for update
  const [updateMessage, setUpdateMessage] = useState("");

  // Load book data when component mounts
  useEffect(() => {
    setLoading(true);
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const existingBook = books.find((b) => b.id === parseInt(id));

    if (existingBook) {
      setBook(existingBook);
      setInitialBook(existingBook);
    } else {
      navigate("/addbook");
    }

    setLoading(false);
  }, [id, navigate]);

  // Handle form changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle book update
  const handleUpdateBook = useCallback(
    (e) => {
      e.preventDefault();
      setUpdating(true); // Start loading

      const books = JSON.parse(localStorage.getItem("books")) || [];
      const updatedBooks = books.map((b) => (b.id === parseInt(id) ? book : b));

      localStorage.setItem("books", JSON.stringify(updatedBooks));
      setUpdateMessage("Book updated successfully!");

      setTimeout(() => {
        setUpdating(false); // Stop loading
        navigate("/booklist");
      }, 1500);
    },
    [book, id, navigate]
  );

  // Check if the book has been modified
  const isModified = JSON.stringify(book) !== JSON.stringify(initialBook);

  // Show loading spinner while the book is being loaded
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleUpdateBook}
        className="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-lg"
      >
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Edit Book</h2>

        {/* Reserve space for message with fixed height */}
        <p
          className="text-green-400 text-center mb-3"
          style={{
            minHeight: "1.5rem",
            visibility: updateMessage ? "visible" : "hidden",
          }}
        >
          {updateMessage || "\u00A0" /* non-breaking space to keep height */}
        </p>

        <Input
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          className="mb-3"
          required
        />

        <Input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          className="mb-3"
          required
        />

        <Input
          name="year"
          type="number"
          placeholder="Published Year"
          value={book.year}
          onChange={handleChange}
          className="mb-3"
          required
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
          className="w-full"
          disabled={!isModified || updating} // Disable when not modified or updating
          loading={updating}
        >
          {updating ? "Updating..." : "Update Book"} {/* Loading text */}
        </Button>
      </form>
    </div>
  );
}

export default EditBook;
