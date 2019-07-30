const { User } = require('../models')
const Jwt = require('jsonwebtoken')
const { token } = require('../config/config')

function tokenSign ({ id, email }) {
  let tokenString = Jwt.sign({ id, email }, token.secretOrPrivateKey, token.options)
  return tokenString
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send({
        code: 200,
        user: { id: user.id, email: user.email },
        token: tokenSign(user.toJSON())
      })
    } catch (err) {
      console.log(err.message)
      let error = []
      // console.log(err)
      if (err.errors) {
        err.errors.forEach(validateError => {
          error.push(validateError.message)
        })
      }
      res.status(400).send({
        code: 400,
        error: error.join('<br/>')
      })
    }
  },
  async delete (req, res) {
    try {
      await User.destroy({
        where: {
          id: req.params.id
        }
      })
      res.send()
    } catch (err) {
      res.status(500).send({
        code: 500,
        error: '数据删除失败'
      })
    }
  },
  async getUserById (req, res) {
    try {
      const user = await User.findByPk(req.params.id)
      res.send(user.toJSON())
    } catch (err) {
      res.status(500).send({
        code: 500,
        error: '数据查询失败'
      })
    }
  },
  async update (req, res) {
    try {
      await User.update(
        req.body,
        {
          where: {
            id: req.params.id
          }
        })
      res.send({
        message: '数据更新成功'
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        code: 500,
        error: '数据更新失败'
      })
    }
  },
  async login (req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      res.status(403).send({
        code: 403,
        error: '邮箱地址不存在，请检查'
      })
    }
    let isValidPassword = user.comparePassword(req.body.password)
    if (isValidPassword) {
      res.send({
        code: 200,
        user: { id: user.id, email: user.email },
        token: tokenSign(user.toJSON())
      })
    } else {
      res.status(403).send({
        code: 403,
        error: '用户名或密码错误'
      })
    }
  }
}
