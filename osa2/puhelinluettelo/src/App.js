import React, { useState, useEffect } from 'react'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import personService from './services/persons'
import Notifications from './components/Notification.js'



const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, showNewPersons ] = useState(persons)
  const [ successMessage, setSuccessMessage] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(responsePersons => {
        setPersons(responsePersons)
        showNewPersons(responsePersons)
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
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            showNewPersons(showPersons.concat(returnedPerson))
            setSuccessMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 2000)  
          })
      } else {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find(person => person.name === newName)
          personService
            .update(person.id, personObject)
              .then(returnedPerson => {
                setPersons(persons.map(personM => personM.id === person.id ? returnedPerson : personM))
                showNewPersons(showPersons.map(personM => personM.id === person.id ? returnedPerson : personM))
                setSuccessMessage(
                  `Updated ${newName}`
                )
                setTimeout(() => {
                  setSuccessMessage(null)
                }, 2000)
              })
              .catch(error => {
                setErrorMessage(
                  `Information of '${newName}' has already been removed from server`
                )
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter(personF => personF.id !== person.id))
                showNewPersons(showPersons.filter(personF => personF.id !== person.id))
              })
        }
          
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
    showNewPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleDelete = (person) => {
    //console.log(id)
    if(window.confirm(`Delete ${person.name} ?`)) {
      personService
      .del(person.id)
        .then(request => {
          setPersons(persons.filter(personF => personF.id !== person.id))
          showNewPersons(showPersons.filter(personF => personF.id !== person.id))
          setSuccessMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2000)
          //console.log("Request", request)
        });
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications.ErrorNotification message={errorMessage}/>
      <Notifications.SuccessNotification message={successMessage} />
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
      <Persons persons={showPersons} handleDelete={handleDelete}/>
    </div>
  )

}

export default App