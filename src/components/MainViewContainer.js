import React, { Component } from 'react'
import { searchTweets, searchFlickrPhotos } from '../api/api.js'
import MainView from './MainView'
import CardGroup from './CardGroup.js'

class MainViewContainer extends Component {
  state = {
    twitter: {
      isEnabled: true,
      tweetIds: [],
    },
    flickr: {
      isEnabled: true,
      photoData: [],
    },
  }

  async fetchTwitterData() {
    try {
      const tweetIds = await searchTweets({
        searchTerm: '#pdx OR #portland',
        count: 50,
        mapper: 'getIds',
      })
      return tweetIds
    } catch (err) {
      console.error(`Whoops! => ${err}`)
      return []
    }
  }

  async fetchFlickrData() {
    try {
      const photoData = await searchFlickrPhotos({
        tags: 'pdx',
        mapper: 'getUrls',
      })
      return photoData
    } catch (err) {
      console.error(`Whoops! => ${err}`)
      return []
    }
  }

  async componentDidMount() {
    const tweetIds = await this.fetchTwitterData()
    const photoData = await this.fetchFlickrData()
    this.setState((ps, props) => {
      return {
        twitter: {
          isEnabled: ps.twitter.isEnabled,
          tweetIds,
        },
        flickr: {
          isEnabled: ps.flickr.isEnabled,
          photoData,
        },
      }
    })
  }

  render() {
    return (
      <MainView>
        <CardGroup {...this.state} />
      </MainView>
    )
  }
}

export default MainViewContainer
