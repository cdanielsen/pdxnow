const express = require('express')
const morgan = require('morgan')
const herokuForceSsl = require('heroku-ssl-redirect')
const { join } = require('path')

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
app.use(morgan('combined'))
app.use(herokuForceSsl())
app.use(express.static(ASSETS))

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
    return console.log('Something bad happened', err)
  }
  console.log(
    `Huzzah! Express Server is listening at http://localhost:${PORT}. NODE_ENV is ${NODE_ENV}`
  )
})
