import React from 'react'
import CardGroup from './CardGroup.js'

const MainView = ({ state }) => {
  return (
    <div>
      <CardGroup {...state} />
    </div>
  )
}

export default MainView
