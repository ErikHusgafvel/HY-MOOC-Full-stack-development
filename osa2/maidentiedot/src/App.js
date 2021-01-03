import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries.js'

const App = () => {
  const [ countries, setNewCountries ] = useState([])
  const [ showCountries, setShowCountries ] = useState([])
  
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setNewCountries(response.data)
    })
  }, [])

  const handleChange = (event) => (
    setShowCountries(
      countries.filter(country => (country.name.toLowerCase().includes(event.target.value)))
    )
  )


  return (
    <div>
      <div>find countries <input onChange={handleChange} />
      </div>
      <div>
        <Countries countries={showCountries} />
      </div>
    </div>
  )
}

export default App