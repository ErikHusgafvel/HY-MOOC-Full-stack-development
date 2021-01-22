import React from 'react'
import Languages from './Languages.js'
import Weather from './Weather.js'

const Countries = ( {countries, handleClick} ) => {
  if(countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if(countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>Spoken languages</h2>
        <ul>
          <Languages languages={country.languages} />
        </ul>
        <img src={country.flag} alt='Flag' width="200" height="200" />
        <h2>Weather in {country.capital}</h2>
        <Weather capital={country.capital} />


      </div>
    )
  } else {
    return (
      countries.map( country => (
        <div key={country.name}>{country.name} <button onClick={() => handleClick(country.name)}>show</button></div>
    )))
  }
}

export default Countries