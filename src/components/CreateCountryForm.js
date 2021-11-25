import React, { useState } from 'react'
import CountryNameField from './fields/CountryNameField'
import YearVistiedField from './fields/YearVistiedField'
import CommentsField from './fields/CommentsField'
import RatingFields from './fields/RatingFields'
import { createCountry } from '../lib/api'
import City from './fields/City'

export default function CreateCountryForm() {
  const [state, setState] = useState({
    formData: {
      name: '',
      city: '',
      yearVisited: '',
      comments: '',
      rating: '',
    },
  })

  const refreshPage = () => {
    window.location.reload(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await createCountry(state.formData)
      refreshPage()
    } catch (err) {
      console.log('error pushing country', err)
    }
  }
  const handleChange = (e) => {
    const formData = {
      ...state.formData,
      [e.target.name]: e.target.value,
    }
    setState({ formData })
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="label">Country</label>
        <CountryNameField
          handleChange={handleChange}
          name={state.formData.name}
        />
        <label className="label">City</label>
        <City handleChange={handleChange} name={state.formData.city} />

        <label className="label">Year Visited</label>
        <YearVistiedField
          handleChange={handleChange}
          name={state.formData.yearVisited}
        />
        <label className="label">Comments</label>
        <CommentsField
          handleChange={handleChange}
          name={state.formData.comments}
        />
        <label className="label">Rating</label>
        <RatingFields
          handleChange={handleChange}
          name={state.formData.comments.rating}
        />
        <br></br>
        <input type="submit" value={`Add Your Trip`} />
      </form>
    </div>
  )
}
