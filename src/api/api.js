import rpVanilla from 'request-promise'
const { REACT_APP_HOST, REACT_APP_PORT } = process.env

const rp = rpVanilla.defaults({
  baseUrl: `http://${REACT_APP_HOST}:${REACT_APP_PORT}/`,
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
    uri: 'api/flickr/searchphotos',
    qs: {
      tags,
      mapper,
    },
  })
}

export { searchTweets, searchFlickrPhotos }
