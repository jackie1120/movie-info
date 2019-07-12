const path = require('path')

module.exports = {
  db: {
    database: 'movie',
    user: 'movie',
    password: 'movie',
    options: {
      host: 'localhost',
      dialect: 'sqlite',
      storage: path.resolve(__dirname, '../db/movie.sqlite'),
      define: {
        paranoid: true,
        underscored: true
      }
    }
  },
  token: {
    secret: 'movie',
    expireIn: '24h'
  }
}
