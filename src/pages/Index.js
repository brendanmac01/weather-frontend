import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Index = (props) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [randomZip, setRandomZip] = useState('');
  const [newForm, setNewForm] = useState({ zip: '' });

  useEffect(() => {
    const weatherData = localStorage.getItem('weatherData');
    const isButtonVisible = localStorage.getItem('isButtonVisible');

    if (weatherData && isButtonVisible === 'false') {
      setCurrentWeather(JSON.parse(weatherData));
      setShowUpdateButton(false);
    } else {
      setShowUpdateButton(true);
      handleRandomLocationClick();
    }
  }, []);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setShowUpdateButton(true);
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleUpdateClick = () => {
    setShowUpdateButton(false);
    handleLocationClick();
  };

  const handleLocationSuccess = async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      const apiKey = 'fcb37b61437142b9abf201101232205';
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setCurrentWeather(data);
        localStorage.setItem('weatherData', JSON.stringify(data));
        localStorage.setItem('isButtonVisible', 'false');
      } else {
        console.error('Request failed. Status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleLocationError = (error) => {
    console.error('Error getting user location:', error.message);
  };

  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createWeather(newForm);
    setNewForm({ zip: '' });
  };

  const handleRandomLocationClick = async () => {
    const min = 10000; 
    const max = 99999; 
    const randomZipCode = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomZip(randomZipCode.toString());

    try {
      const apiKey = 'fcb37b61437142b9abf201101232205';
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${randomZipCode}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setCurrentWeather(data);
      } else {
        console.error('Request failed. Status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const loaded = () => {
    return (
      <div className="weather-container">
        {currentWeather && (
          <div className="weather-info">
            <div className="weather-inner">
              <img
                className="weather-icon"
                src={currentWeather.current.condition.icon}
                alt={currentWeather.current.condition.text}
              />
              <div className="weather-text">
                <h1>
                  {currentWeather.location.name}, {currentWeather.location.region}
                </h1>
                <div className="weather-details">
                  <p>Temperature: {currentWeather.current.temp_c}°C</p>
                  <p>Condition: {currentWeather.current.condition.text}</p>
                  <p>Wind: {currentWeather.current.wind_kph} km/h</p>
                  <p>Precipitation: {currentWeather.current.precip_mm} mm</p>
                  <p>Humidity: {currentWeather.current.humidity}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="button-container">
          {showUpdateButton ? (
            <>
              <button class="btn btn-warning" onClick={handleUpdateClick}>
                Check Local Updates
              </button>
              <button class="btn btn-success" onClick={handleRandomLocationClick}>
                Random Location
              </button>
            </>
          ) : (
            <>
              <button class="btn btn-warning" onClick={handleLocationClick}>
                Get Local Weather
              </button>
              <button class="btn btn-success" onClick={handleRandomLocationClick}>
                Random Location
              </button>
            </>
          )}
        </div>

        {randomZip && <p>Random Zip Code: {randomZip}</p>}

        <form className="my-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={newForm.zip}
              name="zip"
              placeholder="Enter ZIP code"
              onChange={handleChange}
            />
          </div>
            <button type="submit" className="btn btn-primary">Add Location</button>
        </form>


        {props.weather.length > 0 && (
          <div className="zip-codes">
            <h2>Your Zip Codes:</h2>
            <ul>
              {props.weather.map((indvweather) => (
                <li key={indvweather._id}>
                  <Link to={`/weather/${indvweather._id}`}>{indvweather.zip}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const loading = () => {
    return <h11>Please Login to Continue...</h11>;
  };

  return (
    <section className="main-container">
      {props.weather ? loaded() : loading()}
    </section>
  );
};

export default Index;
