import rpVanilla from 'request-promise'
const { REACT_APP_HOST, REACT_APP_PORT, NODE_ENV } = process.env

console.log(NODE_ENV)
const baseUrl =
  NODE_ENV === 'development'
    ? `http://${REACT_APP_HOST}:${REACT_APP_PORT}/`
    : `http://${REACT_APP_HOST}`

const rp = rpVanilla.defaults({
  baseUrl,
  json: true,
})

const searchTweets = ({ searchTerm, count, mapper }) => {
  return rp({
    uri: '/api/twitter/searchtweets',
    qs: {
      searchTerm,
      count,
      mapper,
    },
  })
}

const searchFlickrPhotos = ({ tags, mapper }) => {
  return rp({
    uri: '/api/flickr/searchphotos',
    qs: {
      tags,
      mapper,
    },
  })
}

export { searchTweets, searchFlickrPhotos }
