import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { CountryDetail } from './components/CountryDetail'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showMe, setShowMe] = useState(-1)

  const countryAPI_URL = 'https://restcountries.com/v3.1/all'

  const handleShow = (event) => {
    setShowMe(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowMe(-1)
  }

  const Countries = ({ countries }) => {

    if (countries.length === 1) {
      return (
        <CountryDetail country={countries[0]} />
      )
    }

    if (countries.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }

    return (
      <ul>
        {
          countries.map((country, index) =>
            <li key={country.name.common} >{country.name.common}
              <button value={index} onClick={handleShow}>show</button></li>
          )
        }

      </ul>
    )
  }

  // get data from API countries
  useEffect(() => {
    axios
      .get(countryAPI_URL)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const foundCountries = countries.filter(country => country.name.common.toLowerCase().indexOf(filter.toLowerCase()) >= 0);

  return (
    <div>
      <h2>countries</h2>
      find countries <input
        value={filter}
        onChange={handleFilterChange}></input>
      <Countries countries={foundCountries} />
      <CountryDetail country={foundCountries[showMe]} />
    </div>
  );
}

export default App;
