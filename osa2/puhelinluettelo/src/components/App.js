import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Persons from './Persons.js'
import Filter from './Filter.js'
import PersonForm from './PersonForm.js'



const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, showNewPersons ] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        showNewPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName ,
      number : newNumber
    }
    const ind = persons.findIndex(person => 
      person.name === newName)
    
    if (ind === -1) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      showNewPersons(showPersons.concat(personObject))
     } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNoChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filterChange = (event) => {
    showNewPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={filterChange} />
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleNoChange={handleNoChange}
        newName={newName}
        newNumber={newNumber}
        />
      <h2>Numbers</h2>
      <Persons persons={showPersons} />
    </div>
  )

}

export default App