const express = require('express')
const { join } = require('path')
require('dotenv').config()

const { getTweets } = require('./services/twitter')

const app = express()
const PORT = process.env.PORT || 5001
const ASSETS = join(__dirname, 'build')

// Serve static files from ./build
app.use(express.static(ASSETS))

app.get('/', (req, res) => {
  console.log('Request for root route recieved!')
  res.sendFile(`${ASSETS}/index.html`)
})

app.get('/api/twitter/tweets', async (req, res) => {
  try {
    console.log('Attempting to get the tweets!')
    const tweets = await getTweets('#pdx')
    res.send(tweets)
  } catch (err) {
    console.error(`Twitter service error => ${err}`);
  }
})

// Server listener
app.listen(PORT, err => {
  if (err) {
    return console.log('Something bad happened', err)
  }
  console.log(`Huzzah! Express Server is listening at http://localhost:${PORT}`)
})
