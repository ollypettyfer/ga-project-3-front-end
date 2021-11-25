import React from 'react'

const CountryNameField = ({ name, handleChange }) => {
  return (
    <div>
      <input
        className="input"
        placeholder="Country Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
    </div>
  )
}

export default CountryNameField
