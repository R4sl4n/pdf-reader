import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/index";

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/api/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        My Books
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500 transition-all">
            <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{book.author}</p>
            <Link
              to={`/book/${book.filePath.split('\\').pop()}`}
              className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-xl font-medium hover:opacity-80 transition-all"
            >
              Read →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
};

export default BooksPage;
