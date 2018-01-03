import React, { Component } from 'react'
import { getTweets } from '../api/api.js'
import MainView from './MainView'

class MainViewContainer extends Component {
  state = {
    tweetIds: ['one'],
  }

  async componentDidMount() {
    try {
      const tweets = await getTweets()
      const tweetIds = tweets.statuses.map(status => status.id_str)
      this.setState({
        tweetIds,
      })
    } catch (err) {
      console.error(`Whoops! => ${err}`)
    }
  }

  render() {
    return <MainView tweetIds={this.state.tweetIds} />
  }
}

export default MainViewContainer
