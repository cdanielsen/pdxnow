const rp = require('request-promise').defaults({ json: true })
const { log, error } = console
const { APP_CREDS_TWITTER_SECRET } = process.env

const getToken = () => {
  return rp({
    uri: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    form: {
      grant_type: 'client_credentials',
    },
    headers: {
      Authorization: `Basic ${APP_CREDS_TWITTER_SECRET}`,
    },
  })
}

const searchTweets = async ({ searchTerm, count = 25 }) => {
  if (!process.env.APP_CREDS_TWITTER_TOKEN) {
    try {
      log('Getting/caching an app bearer token...')
      const response = await getToken()
      process.env.APP_CREDS_TWITTER_TOKEN = response.access_token
    } catch (err) {
      error(err)
    }
  } else {
    log('Using cached bearer token...')
  }

  return rp({
    uri: 'https://api.twitter.com/1.1/search/tweets.json',
    method: 'GET',
    qs: {
      q: searchTerm,
      result_type: 'recent',
      count: count,
    },
    headers: {
      Authorization: `Bearer ${process.env.APP_CREDS_TWITTER_TOKEN}`,
      grant_type: 'client',
    },
  })
}

const searchTweetsMappers = {
  getIds: rawData => rawData.statuses.map(status => status.id_str),
}

const searchTweetsHandler = mappers => {
  return async (req, res) => {
    const { searchTerm, count, mapper } = req.query
    try {
      console.log('Attempting to get the tweets!')
      const data = await searchTweets({ searchTerm, count })
      const mappedData = mappers[mapper](data)
      res.send(mappedData)
    } catch (err) {
      console.error(`Twitter service error => ${err}`)
    }
  }
}

module.exports = { searchTweetsHandler, searchTweetsMappers }
