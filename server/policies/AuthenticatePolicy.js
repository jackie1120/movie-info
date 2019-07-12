const Jwt = require('jsonwebtoken')
const config = require('../config/config')

function tokenVerify (token) {
  try {
    Jwt.verify(token, config.token.secretOrPrivateKey)
    return true
  } catch (err) {
    return false
  }
}

module.exports = {
  isValidToken (req, res, next) {
    let bearerToken = req.headers.authorization
    let token = bearerToken.split(' ')[1]
    if (tokenVerify(token)) {
      next()
    } else {
      res.status(403).send({
        error: '登陆凭证无效请重新登陆'
      })
    }
  }
}
