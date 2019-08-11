const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {}
  Model.init({
    name: DataTypes.STRING,
    year: DataTypes.NUMBER,
    director: DataTypes.STRING,
    genre: DataTypes.STRING,
    poster: DataTypes.STRING,
    rating: DataTypes.STRING,
    imdb_id: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Movie'
  })

  return Model
}
