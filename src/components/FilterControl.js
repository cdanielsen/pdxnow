import React from 'react'
import { Button } from 'semantic-ui-react'
import './FilterControl.css'

const FilterControl = ({ name, color, clickHandler, isenabled, style }) => {
  return (
    <Button
      circular
      icon={name}
      color={color}
      onClick={clickHandler}
      isenabled={`${isenabled}`}
      style={style}
    />
  )
}

export default FilterControl
