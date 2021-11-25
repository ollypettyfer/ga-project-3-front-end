import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { getAllCountries, getUser, deleteCountry } from '../lib/api'

export default function EditDelete() {
  const history = useHistory()
  const [userId, setUserId] = useState('')
  const [countries, setCountries] = useState()
  const [toEdit, setToEdit] = useState()
  const [toDelete, setToDelete] = useState()

  const { id } = useParams()
  const countryToEdit = capitalizeFirstLetter(id)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    getUser(token).then((response) => setUserId(response))
  }, [])

  useEffect(() => {
    getAllCountries().then(function (response) {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    if (!countries || !userId || !countryToEdit) {
      return
    }
    const username = userId.data.username

    let userCountry = countries
      .filter((country) => country.createdBy)
      .map((item) => ({
        _id: item._id,
        name: item.name,
        createdBy: item.createdBy.username,
      }))
      .filter((country) => country.createdBy == username)
      .filter((country) => country.name == countryToEdit)
    setToEdit(userCountry[0])

    console.log(`USERCOUNTRY`, userCountry[0])
    setToDelete(userCountry[0])
  }, [countries])

  const deleteTrip = () => {
    if (!toDelete) {
      return
    } else {
      console.log(`To delete`, toDelete._id)

      deleteCountry(toDelete._id)
      history.push('/members')
    }
  }

  return (
    <>
      <div className="Confirm Deletion">
        <h2>Delete Your Trip To {countryToEdit}</h2>
        <button onClick={deleteTrip}>Confirm Deletion</button>
      </div>
      <div className="to-delete">
        {/* <div>
          <h2>Edit Your Trip To {countryToEdit}</h2>
          <h2>Mexico</h2>
          <h3>City</h3>
          <h3>Year Visited</h3>
          <h3>Comments</h3>
          <h3>Rating</h3>
        </div> */}
      </div>
    </>
  )
}
