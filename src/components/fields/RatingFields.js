import React from 'react'

const RatingFields = ({ rating, handleChange }) => {
  return (
    <div>
      <input
        className="input"
        placeholder="1"
        name="rating"
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={handleChange}
      />
    </div>
  )
}

export default RatingFields
