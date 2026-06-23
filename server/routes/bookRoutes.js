const Router = require('express').Router
const { getBooks, createBook } = require('../controllers/bookController')

const router = new Router()

router.get('/books', getBooks)
router.post('/books', createBook)

module.exports = router