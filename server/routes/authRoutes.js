const Router = require('express').Router
const { register, login } = require('../controllers/authController')

const router = new Router()

// маршрут регистрации
router.post('/auth/register', register)

// маршрут входа
router.post('/auth/login', login)

module.exports = router