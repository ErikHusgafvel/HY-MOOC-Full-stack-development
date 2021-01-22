import React from 'react'

const Languages = ( {languages} ) => (
  languages.map( language => (
    <li key={language.name}>{language.name}</li>
  ))
)


export default Languages