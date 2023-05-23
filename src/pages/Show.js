import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Show = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const weather = props.weather;

  const indvweather = weather ? weather.find((p) => p._id === id) : null;

  const [editForm, setEditForm] = useState(indvweather);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (indvweather) {
      setEditForm(indvweather);
    }
  }, [indvweather]);

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'fcb37b61437142b9abf201101232205';
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${indvweather.zip}`;
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

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    props.updateWeather(editForm, editForm._id);
  };

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleDelete = () => {
    props.deleteWeather(indvweather._id)
      .then(() => navigate('/'))
      .catch((error) => console.error('Error deleting weather:', error));
  };

  const loaded = () => {
    return (
      <>
        <h1>{indvweather.zip}</h1>
        <button class="btn btn-warning" onClick={handleEdit}>{isEditing ? 'Cancel Edit' : 'Edit'}</button>
        <button class="btn btn-danger" onClick={handleDelete}>Delete</button>
        <button class="btn btn-success" onClick={fetchWeatherData}>Get Weather Info</button>
        {currentWeather && (
          <>
            <h2>{currentWeather.location.name}, {currentWeather.location.region}</h2>
            <div className="weather-info">
              <img src={currentWeather.current.condition.icon} alt="Weather Icon" />
              <div className="weather-text"style={{ color: 'red' }}>
                <p>
                  <span>Temperature:</span> {currentWeather.current.temp_c}°C
                </p>
                <p>
                  <span>Condition:</span> {currentWeather.current.condition.text}
                </p>
                <p>
                  <span>Wind:</span> {currentWeather.current.wind_kph} km/h
                </p>
                <p>
                  <span>Precipitation:</span> {currentWeather.current.precip_mm} mm
                </p>
                <p>
                  <span>Humidity:</span> {currentWeather.current.humidity}
                </p>
              </div>
            </div>
          </>
        )}
      </>
    );
  };
  

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <div className="indvweather">
      {indvweather ? loaded() : loading()}
      {isEditing && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editForm.zip}
            name="zip"
            placeholder="zip"
            onChange={handleChange}
          />
          <input type="submit" value="Update Location" />
        </form>
      )}
    </div>
  );
};

export default Show;
