import { resolveConfigFile } from 'prettier'
import React, { useState, useEffect } from 'react'
import { getAllCountries } from '../api/Countries.js'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    console.log('searchterm', searchTerm)
  }

  return (
    <section classname="section">
      <div className="container has-text-centered">
        <h1 className="title">Countries Search</h1>
        <div>
          <input
            type="text"
            placeholder="search for country here"
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
          />
          <button onClick={handleSearch}>SEARCH</button>
        </div>
      </div>
    </section>
  )
}

// const handleChange = (e) => {
//   const userInput = e.target.value
//   const filteredCountries = countries.filter((country) => {
//     if (searchTerm.length === 0) {
//       return
//     }
// })
//   setFilteredCountries(filteredCountries)
// }

// import axios from 'axios'
// import React, { Component } from 'react'

// const { API_KEY } = process.env
// const API_URL = 'http://localhost:8001/api/countries'

// class Search extends Component {
//   state = {
//     query: '',
//   }

//   getInfo = () => {
//     axios.get(
//       `${API_URL}?api_key${API_KEY}&PREFIX=${this.state.then(({ data }) => {
//         this.setState({
//           results: data.data,
//         })
//       })}`
//     )
//   }

//   handleInputChange = () => {
//     this.setState(
//       {
//         query: this.search.value,
//       },
//       () => {
//         if (this.state.query && this.state.query.length > 1) {
//           if (this.state.query.length % 2 === 0) {
//             this.getInfo()
//           }
//         }
//       }
//     )
//   }

//   render() {
//     return (
//       <form>
//         <input
//           placeholder="Search for..."
//           ref={(input) => (this.search = input)}
//           onChange={this.handleInputChange}
//         />
//         <p>{this.state.query}</p>
//       </form>
//     )
//   }
// }

// export default Search
