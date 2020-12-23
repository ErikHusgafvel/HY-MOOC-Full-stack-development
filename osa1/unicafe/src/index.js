import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handle, text }) => (
  <button onClick={handle}>{text}</button>
)

const Display = ({ value, text }) => (
  <p>{text} {value}</p>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = (value) => {
    setGood(value + 1)
  }
  const handleNeutral = (value) => {
    setNeutral(value + 1)
  }
  const handleBad = (value) => {
    setBad(value + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handle={() => handleGood(good)} text="good"/>
      <Button handle={() => handleNeutral(neutral)} text="neutral"/>
      <Button handle={() => handleBad(bad)} text="bad"/>
      <Header text="statistics" />
      <Display value={good} text="good"/>
      <Display value={neutral} text="neutral"/>
      <Display value={bad} text="bad"/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);