import React from 'react'

export default function VisistedPlaces(props) {
  return (
    <div className="countries-list">
      <h3 className="countries-list">{props.name}</h3>
      <h3 className="countries-list">{props.city}</h3>
      <h3 className="countries-list">{props.yearVisited}</h3>
      <h3 className="countries-list">{props.comments}</h3>
      <h3 className="countries-list">{props.rating}</h3>
    </div>
  )
}
