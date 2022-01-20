import React from 'react'

const Person = ( {person, handleDelete} ) => {
  //console.log("Person", person)
  return (
    <div>
      {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
     </div>
  )
}


export default Person