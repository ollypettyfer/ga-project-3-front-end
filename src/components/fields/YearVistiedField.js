import React from 'react'

const YearVistiedField = ({ yearVisted, handleChange }) => {
  return (
    <div>
      <input
        className="input"
        placeholder="Year Visted"
        name="yearVisited"
        value={yearVisted}
        onChange={handleChange}
      />
    </div>
  )
}

export default YearVistiedField
