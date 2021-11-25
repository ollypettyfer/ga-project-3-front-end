import React from 'react'

const CityField = ({ tom, handlechange }) => {
  return (
    <div>
      <input
        className="input"
        placeholder="City"
        name="tom"
        value={tom}
        onChange={handlechange}
      />
    </div>
  )
}

export default CityField
