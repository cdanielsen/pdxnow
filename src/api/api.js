import rpVanilla from 'request-promise'
const HOST = window.location.host

const baseUrl = `https://${HOST}`

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
