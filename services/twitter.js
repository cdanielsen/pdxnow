const qs = require('querystring')
const rp = require('request-promise').defaults({json: true})
const { log, error } = console
const { APP_CREDS_TWITTER_SECRET, APP_CREDS_TWITTER_TOKEN } = process.env

const getToken = () => {
  return rp({
    uri: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    form: {
      grant_type: 'client_credentials'
    },
    headers: {
      Authorization: `Basic ${APP_CREDS_TWITTER_SECRET}`,
    }
  })
}

const getTweets = async (searchTerm) => {
  const encodedSearchTerm = qs.escape(searchTerm)

  if (!APP_CREDS_TWITTER_TOKEN) {
    try {
      log('Getting/caching an app bearer token...')
      const response = await getToken()
      process.env.APP_CREDS_TWITTER_TOKEN = response.access_token
    } catch (err) {
      error(err)
    }
  }

  return rp({
    uri: `https://api.twitter.com/1.1/search/tweets.json?q=${encodedSearchTerm}&result_type=recent&count=15`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.APP_CREDS_TWITTER_TOKEN}`,
      grant_type: 'client'
    }
  })
}

module.exports = { getTweets }
