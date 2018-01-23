import React from 'react'
import { Twitter, Aperture } from 'react-feather'

const FilterControl = props => {
  const servicePicker = ({ name, styles, clickHandler, isenabled }) => {
    switch (name) {
      case 'twitter':
        return (
          <Twitter
            {...styles}
            isenabled={`${isenabled}`}
            onClick={clickHandler}
          />
        )
      case 'flickr':
        return (
          <Aperture
            {...styles}
            isenabled={`${isenabled}`}
            onClick={clickHandler}
          />
        )
      default:
        return null
    }
  }

  return <div className="filter-control">{servicePicker(props)}</div>
}

export default FilterControl
