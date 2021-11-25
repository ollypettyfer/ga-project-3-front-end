import React, { useState, useEffect } from 'react'
import CreateCountryForm from '../components/CreateCountryForm'
import { getAllCountries, getUser } from '../lib/api'
import Map from '../components/Map.js'

import Geocode from 'react-geocode'
import ProrgressBar from '../components/ProgressBar'
import MembersCard from '../components/MembersCard'
Geocode.setApiKey('AIzaSyBK6SzZbuxMjIHPxdoBk54ag5K23MLTss4')
Geocode.setLanguage('en')
Geocode.enableDebug()

export default function MembersHome() {
  const [userId, setUserId] = useState('')
  const [countries, setCountries] = useState([])
  const [userCountries, setUserCountries] = useState()
  const [countryData, setCountryData] = useState()
  const [coordinates, setCoordinates] = useState([])
  let geocodedCountries = []

  useEffect(() => {
    if (!userCountries) {
      return
    }
    const array = userCountries
    for (let i = 0; i < array.length; i++) {
      getCoordinates(array[i].name)
    }
    // console.log(`number of user countries are`, array.length)
  }, [userCountries])

  const getCoordinates = async (location) => {
    Geocode.fromAddress(location).then(
      (response) => {
        geocodedCountries.push(response.results[0].geometry.location)
        // console.log(`Data from function`, geocodedCountries)
        setCoordinates(geocodedCountries)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  useEffect(() => {
    getAllCountries().then(function (response) {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    getUser(token).then((response) => setUserId(response))
  }, [])
  // console.log('User ID FROM API IS >> ', userId?.data._id)

  useEffect(() => {
    if (!userId || !countries) {
      return
    } else {
      const username = userId.data.username
      const countryKey = countries.filter((country) => country.createdBy)
      let mappedKey = countryKey.map((item) => ({
        name: item.name,
        createdBy: item.createdBy.username,
      }))
      let finalCountries = mappedKey.filter(
        (country) => country.createdBy == username
      )
      setUserCountries(finalCountries)

      let countryDataParsed = countryKey
        .map((item) => ({
          name: item.name,
          city: item.city,
          yearVisited: item.yearVisited,
          comments: item.comments,
          rating: item.rating,
          createdBy: item.createdBy.username,
        }))
        .filter((country) => country.createdBy == username)
      setCountryData(countryDataParsed)
      console.log(`COUNTRYDATAAA >>>> `, countryDataParsed)
    }
  }, [userId, countries])

  return (
    <div className="members-home">
      <div className="progress-bar">
        <ProrgressBar number={userCountries?.length} />
      </div>
      <div className="main-members-container">
        {/* LEFT SIDE OF PAGE */}
        <div className="left-side">
          {/* MAP COMPONENET */}
          <Map props={coordinates} />
        </div>

        {/* RIGHT SIDE OF PAGE */}

        <div className="right-side">
          <h3>Create New Trip</h3>
          <CreateCountryForm />
        </div>
      </div>

      <div className="bottom-section">
        <h2 className="header">Trip History</h2>
        <div className="visited-countries">
          {countryData?.map(({ name, city, yearVisited, comments, rating }) => {
            return (
              <div className="card">
                <MembersCard
                  className="card"
                  name={name}
                  city={city}
                  yearVisited={yearVisited}
                  imageUrl="https://whynotcuba.com/wp-content/uploads/2019/01/Havana.jpg"
                  comments={comments}
                  rating={rating}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
