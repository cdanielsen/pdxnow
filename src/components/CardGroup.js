import React from 'react'
import { Tweet } from 'react-twitter-widgets'

const CardGroup = props => {
  const generateTwitterCards = (ids, options) => {
    return ids.map(id => (
      <span className="card-items" key={id}>
        <Tweet tweetId={id} options={options} />
      </span>
    ))
  }

  const twitterCards = generateTwitterCards(props.tweetIds, { cards: 'hidden' })

  return <div className="main-content-container">{twitterCards}</div>
}

export default CardGroup
