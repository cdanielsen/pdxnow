import rpVanilla from 'request-promise'
const { REACT_APP_HOST } = process.env

const rp = rpVanilla.defaults({
  baseUrl: `http://${REACT_APP_HOST}/`,
  json: true,
})

const getTweets = () => {
  return rp({
    uri: '/api/twitter/tweets',
  })
}

export { getTweets }
