import React from 'react'
import { Tweet } from 'react-twitter-widgets'

const MainView = ({ tweetIds = [] }) => {
  return (
    <div className="main-content-container">
      {tweetIds.map(id => (
        <span className="card-items" key={id}>
          <Tweet tweetId={id} options={{ theme: 'dark', cards: 'hidden' }} />
        </span>
      ))}
    </div>
  )
}

export default MainView
