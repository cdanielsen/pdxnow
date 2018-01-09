const rp = require('request-promise').defaults({ json: true })
const { log, error } = console
const { APP_CREDS_FLICKR_SECRET } = process.env

const getFlickrs = searchTerm => {
  return rp({
    uri: 'https://api.flickr.com/services/rest',
    method: 'GET',
    qs: {
      method: 'flickr.photos.search',
      api_key: `${APP_CREDS_FLICKR_SECRET}`,
      tags: 'pdx',
      format: 'json',
      nojsoncallback: 1,
      extras: 'url_m',
    },
  })
}

const searchFlickrPhotosMappers = {
  getUrls: rawData => {
    return rawData.photos.photo.map(photo => {
      return {
        url_m: photo.url_m,
        title: photo.title,
      }
    })
  },
}

const searchFlickrPhotosHandler = mappers => {
  return async (req, res) => {
    const { searchTerm, mapper } = req.query
    try {
      log('Attempting to get the flickrs!')
      const data = await getFlickrs({ searchTerm })
      const mappedData = mappers[mapper](data)
      res.send(mappedData)
    } catch (err) {
      error(`Flickr service error => ${err}`)
    }
  }
}

module.exports = { searchFlickrPhotosHandler, searchFlickrPhotosMappers }
