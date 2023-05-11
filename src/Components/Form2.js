import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form2 = () => {
  //this cause page to go blank
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  //const apiKey = 'f8eba492ca67e76475f2d53c6ed83d87';
  const [temp, setTemp] = useState('');
  const [location, setLocation] = useState('');
  
  const getWeather = async(ev) => {
    ev.preventDefault();
    try{
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    
 
    console.log(response.data.main.temp);
    setTemp(convertTempToFahrenheight(response.data.main.temp));
    }
    catch(ex){
      console.log(ex)
    }
  }
  const convertTempToFahrenheight = (degreesKelvin) => {
    const f = (Number(degreesKelvin) - 273.15) * 9/5 + 32;
    return f;
  };
  return (
    <>
      <form onSubmit={ getWeather }>
        <input value={ location } onChange={ ev => setLocation(ev.target.value) }/>
        <button>Search</button>
      </form>
      <div>
        Temp: { temp }
      </div>
    </>
    )
 // return (<hr/>)
};

export default Form2;