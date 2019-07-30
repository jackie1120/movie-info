const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {}
  Model.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    poster: DataTypes.STRING,
    rating: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Movie'
  })

  return Model
}
