import React from 'react'
import Languages from './Languages.js'

const Countries = ( {countries} ) => {
  if(countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if(countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          <Languages languages={country.languages} />
        </ul>
        <img src={country.flag} alt='Flag' width="200" height="200" />

      </div>
    )
  } else {
    return (
      countries.map( country => (
        <div key={country.name}>{country.name}</div>
    )))
  }
}

export default Countries