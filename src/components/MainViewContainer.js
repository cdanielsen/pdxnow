import React, { Component } from 'react'
import { searchtweets } from '../api/api.js'
import MainView from './MainView'

class MainViewContainer extends Component {
  state = {
    twitter: {
      isEnabled: true,
      tweetIds: [],
    },
  }

  async fetchTwitterData() {
    try {
      const tweetIds = await searchtweets({
        searchTerm: '#pdx',
        count: 50,
        mapper: 'getIds',
      })
      return tweetIds
    } catch (err) {
      console.error(`Whoops! => ${err}`)
      return []
    }
  }

  async componentDidMount() {
    const tweetIds = await this.fetchTwitterData()
    this.setState((ps, props) => {
      return {
        twitter: {
          isEnabled: ps.twitter.isEnabled,
          tweetIds,
        },
      }
    })
  }

  render() {
    return <MainView twitter={{ ...this.state.twitter }} />
  }
}

export default MainViewContainer
