import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { getPhoto } from '../lib/api'

function MembersCard({ name, city, rating, yearVisited, comments }) {
  const history = useHistory()
  const [image, setImage] = useState()
  const placeImages = async () => {
    console.log(`HANDLE CLICKED!`)
    const imageUrl2 = await getPhoto(name)
    setImage(imageUrl2.data.photos[0].src.landscape)
  }

  useEffect(() => {
    placeImages()
  }, [name])

  const editTrip = () => {
    history.push(`/editdelete/${name}`)
  }

  return (
    <div className="card-container">
      <div className="image-container">
        <img src={image} alt="picture of the country" />
      </div>

      <div className="card-content">
        <div className="card-title">
          <h3>
            {city}
            {city ? ', ' : ''}
            {name}
          </h3>
          <h3>
            {rating ? 'You rated it ' : ''}
            {rating}
            {rating ? '/5' : ''}
          </h3>
        </div>
        <div className="card-body">
          <p>
            {comments}
            {comments
              ? ''
              : 'No comments added for this trip. Why not add some by clicking the edit button!'}
          </p>
          <div className="card-body">
            <h4>
              {yearVisited ? 'You went on this trip in ' : ''}
              {yearVisited}
            </h4>
          </div>
        </div>
        <div className="btn">
          <button onClick={editTrip}>DELETE TRIP</button>
        </div>
      </div>
    </div>
  )
}

export default MembersCard
