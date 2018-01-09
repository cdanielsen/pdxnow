import React from 'react'
import CardGroup from './CardGroup.js'

const MainView = ({ twitter }) => {
  return (
    <div>
      <CardGroup {...twitter} />
    </div>
  )
}

export default MainView
