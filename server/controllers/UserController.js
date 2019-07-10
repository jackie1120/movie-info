const { User } = require('../models')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send({
        user: user.toJSON()
      })
    } catch (err) {
      res.status(400).send({
        code: 400,
        error: '该邮箱已经注册'
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
      const user = await User.update(
        req.body,
        {
          where: {
            id: req.params.id
          }
        })
      console.log(user)
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
  }
}
