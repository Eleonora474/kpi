const config = require('config')
const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
  // Get token from header
  const token = JSON.parse(req.header('auth'))

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Нет токена, авторизация отклонена' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.employeId = decoded.employeId
    next()
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: 'Токен неверный' })
  }
}

module.exports = auth
