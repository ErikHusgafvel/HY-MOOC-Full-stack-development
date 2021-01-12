import React from 'react'

const Languages = ( {languages} ) => (
  languages.map( language => (
    <li>{language.name}</li>
  ))
)


export default Languages