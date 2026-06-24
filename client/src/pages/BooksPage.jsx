import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/index";

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/api/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        marginBottom: '32px',
        color: 'rgba(255,255,255,0.9)',
        letterSpacing: '1px'
      }}>
        My Books
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {books.map(book => (
          <div key={book.id} className="card" style={{ transition: 'all 0.2s' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '6px' }}>
              {book.title}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '20px' }}>
              {book.author}
            </p>
            <Link
              to={`/book/${book.filePath.split('\\').pop()}`}
              className="btn btn-green"
            >
              Читать →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;