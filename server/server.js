const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize } = require('./models')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

require('./router')(app)

sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => console.log('app listening on port 3000!'))
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
