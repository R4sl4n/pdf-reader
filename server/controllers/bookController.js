const Book = require('../models/Book')

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll()
    res.json(books)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const createBook = async (req, res) => {
  try {
    const { title, author, filePath } = req.body
    const book = await Book.create({ title, author, filePath })
    res.json(book)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = { getBooks, createBook }