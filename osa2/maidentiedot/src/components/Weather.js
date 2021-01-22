import React, { useState , useEffect} from 'react'
import axios from 'axios'

const Weather = ( {capital} ) => {

  const [pending, setPending] = useState(<div>Pending</div>)

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
    .then(response => {
      //console.log(response)
      setPending(
        <div>
          <div><strong>temperature: </strong>{response.data.current.temperature} Celsius</div>
          {response.data.current.weather_icons.map( (source, index) => {
            //console.log({source})
            return (
              <div key={index}>
                <img
                src={source} 
                alt={response.data.current.weather_descriptions[{index}]} width="100" height="100" />
              </div>
            )
          })}
          <div><strong>wind: </strong>{response.data.current.wind_speed} mph direction {response.data.current.wind_dir}</div>

          
        </div>
      )
    })
  }, [])
  return ( <div>{pending}</div> )
}


export default Weather