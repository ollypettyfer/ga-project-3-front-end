import React from 'react'

const City = ({ city, handleChange }) => {
  return (
    <div>
      <input
        className="input"
        placeholder="City"
        name="city"
        value={city}
        onChange={handleChange}
      />
    </div>
  )
}

export default City
