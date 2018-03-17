const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cardsRouter = require('./cards/router')
const gamesRouter = require('./game/router')

app.use(bodyParser.json())

app.listen(4003, () => console.log('Express API listening on port 4003'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.use(cardsRouter)
app.use(gamesRouter)
