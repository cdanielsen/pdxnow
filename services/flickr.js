const rp = require('request-promise').defaults({ json: true })
const { log, error } = console
const { APP_CREDS_FLICKR_SECRET } = process.env

const getFlickrs = tags => {
  return rp({
    uri: 'https://api.flickr.com/services/rest',
    method: 'GET',
    qs: {
      method: 'flickr.photos.search',
      api_key: `${APP_CREDS_FLICKR_SECRET}`,
      tags,
      format: 'json',
      nojsoncallback: 1,
      extras: 'url_m',
      sort: 'interestingness-desc',
    },
  })
}

const searchFlickrPhotosMappers = {
  getUrls: rawData => {
    return rawData.photos.photo.map(({ owner, id, url_m, title }) => {
      return {
        owner,
        id,
        url_m,
        title,
      }
    })
  },
}

const searchFlickrPhotosHandler = mappers => {
  return async (req, res) => {
    const { tags, mapper } = req.query
    try {
      log('Attempting to get the flickrs!')
      var rawData = await getFlickrs(tags)
      const mappedData = mappers[mapper](rawData)
      res.send(mappedData)
    } catch (err) {
      error(
        `Flickr service error => ${err} => ${JSON.stringify(rawData, null, 2)}`
      )
    }
  }
}

module.exports = { searchFlickrPhotosHandler, searchFlickrPhotosMappers }
