import React from 'react'
import Person from './Person.js'

const Persons = ( {persons, handleDelete} ) => {  
  //console.log("Persons" , persons)
  return persons.map(person => (
    <Person key={person.name} person={person} handleDelete={handleDelete} />
    )
  )
}

export default Persons