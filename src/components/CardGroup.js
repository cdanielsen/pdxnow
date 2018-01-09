import React from 'react'
import { Tweet } from 'react-twitter-widgets'

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
        <img src={datum.url_m} alt={datum.title} />
      </span>
    ))
  }

  // Stolen with appreciation from https://bost.ocks.org/mike/shuffle/ !!
  const shuffleArray = array => {
    var m = array.length,
      t,
      i
    while (m) {
      i = Math.floor(Math.random() * m--)
      t = array[m]
      array[m] = array[i]
      array[i] = t
    }
    return array
  }

  const twitterCards = generateTwitterCards(twitter.tweetIds, {
    cards: 'hidden',
  })
  const flickrCards = generateFlickrCards(flickr.photoData)
  const renderArray = shuffleArray([...twitterCards, ...flickrCards])

  return <div className="main-content-container">{renderArray}</div>
}

export default CardGroup
