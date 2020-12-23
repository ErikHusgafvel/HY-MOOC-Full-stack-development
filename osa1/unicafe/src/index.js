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
  const [all, setAll] = useState(0)
  
  const handleGood = (valueGood, valueAll) => {
    setAll(valueAll + 1)
    setGood(valueGood + 1)
  }
  const handleNeutral = (valueNeutral, valueAll) => {
    setAll(valueAll + 1)
    setNeutral(valueNeutral + 1)
  }
  const handleBad = (valueBad, valueAll) => {
    setAll(valueAll + 1)
    setBad(valueBad + 1)
  }
  
  // calculate avg and pos% every time App is re-rendered
  let avg = isNaN((good-bad)/all) ? 0 : (good-bad)/all
  let pos = isNaN(good/all) ? 0 : good/all*100 + " %"

  return (
    <div>
      <Header text="give feedback" />
      <Button 
      handle={() => handleGood(good, all)}
      text="good"/>
      <Button 
      handle={() => handleNeutral(neutral, all)}
      text="neutral"/>
      <Button 
      handle={() => handleBad(bad, all)}
      text="bad"/>
      <Header text="statistics" />
      <Display value={good} text="good"/>
      <Display value={neutral} text="neutral"/>
      <Display value={bad} text="bad"/>
      <Display value={all} text="all" />
      <Display value={avg} text="average" />
      <Display value={pos} text="positive" />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);