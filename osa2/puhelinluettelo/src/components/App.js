import React, { useState } from 'react'
import Person from './Person.js'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName
    }
    const ind = persons.findIndex(person => 
      person.name === newName)
    
    if (ind === -1) {
      setPersons(persons.concat(personObject))
      setNewName('')
     } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleChange}/>
        </div>
        <div>
          <button 
            type="submit"
            >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person key={person.name} person={person} />
        )
      )}
    </div>
  )

}

export default App