import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import API from "../api/index";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/api/books").then((res) => setBooks(res.data));
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/api/books/${id}`);
    setBooks(books.filter((b) => b.id !== id));
  };

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div style={{ padding: "24px" }}>
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        My Books
      </h1>
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "16px",
          padding: "8px 14px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          color: "white",
          width: "300px",
          fontSize: "13px",
          outline: "none",
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
        }}
      >
        {filtered.map((book) => (
          <div
            key={book.id}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "14px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              {book.title}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "12px",
                marginBottom: "12px",
              }}
            >
              {book.author}
            </p>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Link
                to={`/book/${book.filePath.split("\\").pop()}`}
                className="btn btn-green"
                style={{ fontSize: "11px", padding: "4px 10px" }}
              >
                Read →
              </Link>
              <button
                className="btn btn-dark"
                onClick={() => handleDelete(book.id)}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
