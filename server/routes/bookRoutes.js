const Router = require('express').Router
const { getBooks, createBook, upload, updatePage } = require('../controllers/bookController')

const router = new Router()

router.get('/books', getBooks)
router.post('/books', upload.single('file'), createBook)
router.put('/books/:id', updatePage)

module.exports = router