const express = require('express')
const app = express()
const cardRouter = require('./cards/router')
const gameRouter = require('./game/router')
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(4003, () => console.log('Express API listening on port 4003'))


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.use(cardRouter)
app.use(gameRouter)
