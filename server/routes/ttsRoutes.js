const Router = require('express').Router
const { textToSpeech } = require('../controllers/ttsController')

const router = new Router()

router.post('/tts', textToSpeech)

module.exports = router