import React, { useState, useEffect } from 'react'
import { getPhoto } from '../lib/api'

const CountriesCard = ({
  name,
  username,
  city,
  yearVisited,
  comments,
  rating,
}) => {
  const [image, setImage] = useState()
  const placeImages = async () => {
    console.log(`HANDLE CLICKED!`)
    const imageUrl2 = await getPhoto(name)
    setImage(imageUrl2.data.photos[0].src.landscape)
  }

  useEffect(() => {
    placeImages()
  }, [name])

  console.log(`THIS IS THE USERNAME`, username)
  let user = username?.username
  return (
    <div className="country-card-container">
      <div className="country-card">
        <div className="country-card-content">
          <div className="image-container">
            <img src={image} alt="picture of the country" />
          </div>
          <div className="country-card-content">
            <h2>CREATED BY: {user}</h2>
          </div>
        </div>
        <div className="country-card-content">
          <h3>Country: {name}</h3>
        </div>
        <div className="country-card-content">
          <h4>Cities Visited: {city}</h4>
        </div>
        <div className="country-card-content">
          <h4>Year Visted: {yearVisited}</h4>
        </div>
        <div className="country-card-content">
          <h4>Comments: {comments}</h4>
        </div>
        <div className="country-card-content">
          <h4>Rating: {rating}</h4>
        </div>
      </div>
    </div>
  )
}

export default CountriesCard
