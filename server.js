const express = require('express')
const herokuForceSsl = require('heroku-ssl-redirect')
const { join } = require('path')
const { log } = console
require('dotenv').config()
const { NODE_ENV } = process.env
const {
  searchTweetsHandler,
  searchTweetsMappers,
} = require('./services/twitter')
const {
  searchFlickrPhotosHandler,
  searchFlickrPhotosMappers,
} = require('./services/flickr')

const app = express()
const PORT = process.env.PORT || 5001
const ASSETS = join(__dirname, 'build')

// Serve static files from ./build
app.use(express.static(ASSETS))
app.use(herokuForceSsl())
app.use('*', (req, res, next) => {
  log(`${req.method} request for route ${req.originalUrl} recieved`)
  next()
})

app.get('/', (req, res) => {
  res.sendFile(`${ASSETS}/index.html`)
})

app.get('/api/twitter/searchtweets', searchTweetsHandler(searchTweetsMappers))
app.get(
  '/api/flickr/searchphotos',
  searchFlickrPhotosHandler(searchFlickrPhotosMappers)
)

// Server listener
app.listen(PORT, err => {
  if (err) {
    return log('Something bad happened', err)
  }
  log(
    `Huzzah! Express Server is listening at http://localhost:${PORT}. NODE_ENV is ${NODE_ENV}`
  )
})
