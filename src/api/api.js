import rpVanilla from 'request-promise'
const { REACT_APP_HOST, REACT_APP_PORT } = process.env

const rp = rpVanilla.defaults({
  baseUrl: `http://${REACT_APP_HOST}:${REACT_APP_PORT}/`,
  json: true,
})

const getTweets = () => {
  return rp({
    uri: '/api/twitter/tweets',
  })
}

export { getTweets }
