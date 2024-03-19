
import React, { useState } from 'react';
import './App.css';
import { FaTint, FaWind } from 'react-icons/fa';




let App = () => {
  let [city, setCity] = useState('');
  let [temp, setTemp] = useState('');
  const [humidity, setNewHumidity] = useState(null);
  const [speed, setNewSpeed] = useState(null);
  const [desc, setNewDesc] = useState(null);

  let changeHandler = (e) => {
    setCity(e.target.value);
  };

  let submitHandler = (e) => {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q= ${city}&appid=fd82e92bde6e2557b3e8f1451430ca6a`)
      .then((val) => val.json()).then((val) => {if (city === '') { alert('Enter city name');
        } else if (val.main && val.main.temp !== undefined) {
          let kelvin = val.main.temp;
          let celsius = kelvin - 273.15;
          console.log(val);
          setTemp(`${city} ${Math.round(celsius)}°C`);
          setNewHumidity(val.main.humidity);
          setNewSpeed(val.wind.speed);
          setNewDesc(val.weather[0].description);
          setCity('');
        } else {
          alert('Invalid response from the  Or Enter a valid city Name');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
      });
  };



return (
  <div className='body'>
    
    <center>
      <div className='title'><br /><br /><br />
        <h3>Weather App Dashboard</h3>
      </div>
      <form onSubmit={submitHandler}>
        <input
          style={{ width: '280px', height: '40px', backgroundColor: 'white' }}
          type='text'
          value={city}
          name='city'
          placeholder='Enter a city name'
          onChange={changeHandler}/><br /><br /><br />
        <button className='btn' type='submit'>Get</button>
        <br />
        <p className='demo1'>
          <FaTint /> Humidity: {humidity}
        </p>
        <p className='demo2'>
          <FaWind /> Speed: {speed}
        </p>
        <p className='demo2'>Description: {desc}</p>
      </form>
      <h2 className='demo4'>{temp}</h2>
    </center>
  </div>
)}
export default App;





