import React from 'react'
import ReactDOM from 'react-dom'

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

const App = () => {
  const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
  ]
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} /> )
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
