import React, { Component } from 'react'
import { searchTweets, searchFlickrPhotos } from '../api/api.js'
import MainView from './MainView'
import CardGroup from './CardGroup.js'
import FilterControl from './FilterControl.js'
import './MainViewContainer.css'

class MainViewContainer extends Component {
  state = {
    twitter: {
      isEnabled: false,
      tweetIds: [],
    },
    flickr: {
      isEnabled: false,
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

  onTwitterClick = () => {
    this.setState(prevState => ({
      ...prevState,
      twitter: {
        ...prevState.twitter,
        isEnabled: !prevState.twitter.isEnabled,
      },
    }))
  }

  onFlickrClick = () => {
    this.setState(prevState => ({
      ...prevState,
      flickr: {
        ...prevState.flickr,
        isEnabled: !prevState.flickr.isEnabled,
      },
    }))
  }

  render() {
    return (
      <MainView>
        <div className="filter-group">
          <FilterControl
            name="twitter"
            color="blue"
            style={{ fontSize: '2rem' }}
            clickHandler={this.onTwitterClick}
            isenabled={this.state.twitter.isEnabled}
          />
          <FilterControl
            name="flickr"
            color="blue"
            style={{ fontSize: '2rem' }}
            clickHandler={this.onFlickrClick}
            isenabled={this.state.flickr.isEnabled}
          />
        </div>
        <CardGroup {...this.state} />
      </MainView>
    )
  }
}

export default MainViewContainer
