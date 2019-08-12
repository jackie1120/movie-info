const { Movie, Sequelize } = require('../models')

module.exports = {
  async create (req, res) {
    try {
      const movie = await Movie.create(req.body)
      res.send({
        code: 200,
        movie: movie.toJSON()
      })
    } catch (err) {
      let error = []
      if (err.errors) {
        err.errors.forEach(validateError => {
          error.push(validateError.message)
        })
      } else {
        error.push('数据保存失败，请稍后再试')
      }
      res.status(400).send({
        code: 400,
        error: error.join('<br/>')
      })
    }
  },
  async update (req, res) {
    try {
      await Movie.update(
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
  async getAll (req, res) {
    const Op = Sequelize.Op
    const operators = {}
    if (req.query.genre) {
      const filter = {
        where: {
          genre: { [Op.like]: `%${req.query.genre}%` }
        }
      }
      Object.assign(operators, filter)
    }
    if (req.query.orderby === 'latest') {
      Object.assign(operators, { order: [['updatedAt', 'DESC']] })
    }
    if (req.query.orderby === 'rating') {
      Object.assign(operators, { order: [['rating', 'DESC']] })
    }
    try {
      const movies = await Movie.findAll(operators)
      res.send({
        code: 200,
        movies: movies
      })
    } catch (err) {
      res.status(400).send({
        code: 400,
        error: '数据获取失败'
      })
    }
  },
  async getById (req, res) {
    try {
      const movie = await Movie.findByPk(req.params.id)
      if (movie) {
        res.send({
          code: 200,
          movie: movie
        })
      } else {
        throw (new Error('没有找到对应ID的数据'))
      }
    } catch (err) {
      res.status(400).send({
        code: 400,
        error: '数据获取失败'
      })
    }
  },
  async delete (req, res) {
    try {
      await Movie.destroy({
        where: {
          id: req.params.id
        }
      })
      res.send({
        code: 200
      })
    } catch (err) {
      res.status(400).send({
        code: 400,
        error: '数据删除失败'
      })
    }
  }
}
