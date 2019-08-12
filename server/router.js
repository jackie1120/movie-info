const UserController = require('./controllers/UserController')
const MovieController = require('./controllers/MovieController')
const AuthenticatePolicy = require('./policies/AuthenticatePolicy')

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send({
      msg: 'Hello node'
    })
  })
  app.post('/users', UserController.register)
  app.put('/users/:id', UserController.update)
  app.delete('/users/:id', UserController.delete)
  app.get('/users/:id',
    AuthenticatePolicy.isValidToken,
    UserController.getUserById
  )
  app.post('/users/login', UserController.login)

  app.post('/movies',
    AuthenticatePolicy.isValidToken,
    MovieController.create
  )
  app.get('/movies', MovieController.getAll)
  app.get('/movies/:id', MovieController.getById)
  app.put('/movies/:id',
    AuthenticatePolicy.isValidToken,
    MovieController.update
  )
  app.delete('/movies/:id',
    AuthenticatePolicy.isValidToken,
    MovieController.delete
  )
  app.get('*', (req, res) => {
    res.send({
      code: 200,
      msg: '欢饮使用后台接口服务，具体请求地址请参考文档'
    })
  })
}
