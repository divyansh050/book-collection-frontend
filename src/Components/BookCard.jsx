import Button from "./Button";

function BookCard({ book, onEdit, onDelete, viewMode }) {
  const placeholderImage =
    "https://cdn.vectorstock.com/i/1000x1000/67/26/black-books-icon-isolated-on-yellow-background-vector-35426726.webp"; // Placeholder image URL

  return viewMode === "card" ? (
    <div className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-102 transition-all">
      {/* Placeholder Image */}
      <img
        src={book.imageUrl || placeholderImage} // Use book image URL or placeholder if none exists
        alt={book.title}
        className="w-full h-48 object-cover rounded mb-4"
      />

      <h2
        title={book.title}
        className="line-clamp-2 text-xl font-semibold text-yellow-400"
      >
        {book.title}
      </h2>
      <p title={book.author} className="line-clamp-2 text-gray-300">
        {book.author}
      </p>
      <p title={book.year} className="line-clamp-2 text-gray-400 text-sm">
        {book.year}
      </p>
      <p title={book.description} className="line-clamp-2 text-gray-300 mt-2">
        {book.description}
      </p>

      {/* Action buttons */}
      <div className="mt-auto flex justify-end mt-4 space-x-2">
        <Button className="mt-4" variant="ghost" onClick={() => onEdit(book)}>
          Edit
        </Button>

        <Button
          className="mt-4"
          variant="danger"
          onClick={() => onDelete(book.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  ) : (
    <div
      key={book.id}
      className="text-left bg-gray-800 p-4 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center"
    >
      <div>
        <h3
          title={book.title || "-"}
          className="line-clamp-1 text-lg font-semibold text-yellow-400"
        >
          {book.title}
        </h3>
        <p title={book.author || "-"} className="line-clamp-1 text-sm">
          Author: {book.author || "-"}
        </p>
        <p title={book.year || "-"} className="line-clamp-1 text-sm">
          Published Year: {book.year || "-"}
        </p>
        <p title={book.description || "-"} className="line-clamp-1 text-sm">
          Description: {book.description || "-"}
        </p>
      </div>
      <div className="flex gap-3 ml-2 mt-2 md:mt-0">
        <Button variant="ghost" onClick={() => onEdit(book)}>
          Edit
        </Button>

        <Button variant="danger" onClick={() => onDelete(book.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BookCard;
