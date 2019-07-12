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
    secretOrPrivateKey: 'movie',
    options: {
      expiresIn: '24h'
    }
  }
}
