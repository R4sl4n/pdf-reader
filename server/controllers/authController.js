const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
  try {
    const { email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hash })
    res.json({ message: 'User created', id: user.id })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(404).json({ message: 'User not found' })
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ message: 'Wrong password' })
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = { register, login }