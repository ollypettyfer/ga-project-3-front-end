import React from 'react'

const CommentsField = ({ comments, handleChange }) => {
  return (
    <div>
      <textarea
        className="input text-area"
        type="text"
        placeholder="Comments"
        name="comments"
        value={comments}
        max="300"
        onChange={handleChange}
      />
    </div>
  )
}

export default CommentsField
