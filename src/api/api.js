import rpVanilla from 'request-promise'
const { REACT_APP_HOST, REACT_APP_PORT } = process.env

const rp = rpVanilla.defaults({
  baseUrl: `http://${REACT_APP_HOST}:${REACT_APP_PORT}/`,
  json: true,
})

const searchtweets = ({ searchTerm, count, mapper }) => {
  return rp({
    uri: '/api/twitter/searchtweets',
    qs: {
      searchTerm,
      count,
      mapper,
    },
  })
}

export { searchtweets }
