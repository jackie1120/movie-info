const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send({
      msg: 'Hello node'
    })
  })
  app.post('/users', UserController.register)
  app.put('/users/:id', UserController.update)
  app.delete('/users/:id', UserController.delete)
  app.get('/users/:id', UserController.getUserById)

  app.post('/users/login', UserController.login)
}
