const Router = require('express').Router
const { getBooks, createBook, upload, updatePage, deleteBook } = require('../controllers/bookController')

const router = new Router()

router.get('/books', getBooks)
router.post('/books', upload.single('file'), createBook)
router.put('/books/:id', updatePage)
router.delete('/books/:id', deleteBook)

module.exports = router