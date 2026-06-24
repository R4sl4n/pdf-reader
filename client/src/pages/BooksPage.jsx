import { useState, useEffect } from 'react'
import API from '../api/index'

const BooksPage = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    API.get('/api/books').then(res => setBooks(res.data))
  }, [])

  return (
    <div>
      <h1>My Books</h1>
      {books.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  )
}

export default BooksPage