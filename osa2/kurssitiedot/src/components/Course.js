import React from 'react'

const Header = (props) => (
  <h2>{props.course}</h2>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => {
  //console.log(props)
  return (
    <div>
      {props.parts.map(part => {
        //console.log(part)
        return (
          <Part key={part.id} part={part} />
        )
      }          
        )}
    </div>
  )
}

const Total = (props) => {
  //console.log(props)
  const total = props.parts.reduce( (sum, part) => {
    //console.log(part)
    return sum + part.exercises
  }, 0)
  return (
    <b>total of {total} exercises</b>
  )
}

const Course = ( {course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div>
  
)

export default Course