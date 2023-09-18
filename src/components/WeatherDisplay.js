import React from 'react';
import './WeatherDisplay.css';


function WeatherDisplay({ weather }) {
  console.log(weather);
  if (!weather) return null;

  const currentTime = new Date().toLocaleTimeString();

  const temperature = weather?.weather?.temperature;
  const feelsLike = weather?.weather?.feels_like;
  const weatherIcon = weather?.weather?.icon;
  const weatherDescription = weather?.weather?.description;
  // const minTemperature = weather?.weather?.temp_min;
  // const maxTemperature = weather?.weather?.temp_max;
  // const humidity = weather?.weather?.humidity;


  return (
    <div className="weather-card">
      <div className="header">
        <h4>CURRENT WEATHER</h4>
        <p className="weather-time">{currentTime}</p>
      </div>

      <div className="center-content">
        <div className="icon-container">
          {weatherIcon && <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={weatherDescription} />}
        </div>

        <div className="temperature">
          <h4>{temperature}°</h4>
          <div className="feels-like">
            <p>Feels like {feelsLike}°</p>
          </div>
        </div>
      </div>

      <div className="bottom-content">
        <div className="weather-description">
          <p>{weatherDescription}</p>
        </div>
        <div className="more-details">
          {/* <a href="#">More Details</a> */}
          <p>More Details</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
