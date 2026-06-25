const Book = require('../models/Book')
const upload = require('../config/multer')

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
    const { title, author } = req.body
    const filePath = req.file.path
    const book = await Book.create({ title, author, filePath })
    res.json(book)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const updatePage = async (req, res) => {
  try {
    const { id } = req.params
    const { currentPage } = req.body
    await Book.update({ currentPage }, { where: { id } })
    res.json({ message: 'Страница обновлена' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = { getBooks, createBook, upload, updatePage }

