const { Movie } = require('../models')

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
  async getAll (req, res) {
    try {
      const movies = await Movie.findAll()
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
