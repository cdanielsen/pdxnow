import React from 'react'
import shuffle from 'lodash.shuffle'
import { Tweet } from 'react-twitter-widgets'

const TWITTER_CARD_OPTS = {
  cards: 'hidden',
  hide_thread: true,
}

const CardGroup = ({ twitter, flickr }) => {
  const generateTwitterCards = (ids, options) => {
    return ids.map(id => (
      <span className="card-items" key={id}>
        <Tweet tweetId={id} options={options} />
      </span>
    ))
  }

  const generateFlickrCards = data => {
    return data.map((datum, idx) => (
      <span className="card-items" key={idx}>
        <a href={`https://www.flickr.com/photos/${datum.owner}/${datum.id}`}>
          <img src={datum.url_m} alt={datum.title} />
        </a>
      </span>
    ))
  }

  const twitterCards = generateTwitterCards(twitter.tweetIds, TWITTER_CARD_OPTS)
  const flickrCards = generateFlickrCards(flickr.photoData)
  const renderArray = shuffle([...twitterCards, ...flickrCards])

  return <div className="main-content-container">{renderArray}</div>
}

export default CardGroup
