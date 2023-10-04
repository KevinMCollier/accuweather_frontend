import React from 'react';
import './WeatherDisplay.css';
import { Link } from 'react-router-dom';



function WeatherDisplay({ weather, selectedLocation }) {
  console.log(weather);
  if (!weather) return null;

  const timezone = weather?.timezone;
  const localTimeInMilliseconds = Date.now() + (timezone * 1000);
  const localTimeString = new Date(localTimeInMilliseconds).toLocaleString('en-US', {timeZone: 'UTC'});
  const currentTime = new Date(localTimeString);
  const sunrise = new Date(weather.sunrise * 1000);
  const sunset = new Date(weather.sunset * 1000);

  const isDayTime = currentTime.getTime() >= sunrise.getTime() && currentTime.getTime() <= sunset.getTime();

  const temperature = weather?.weather?.temperature;
  const feelsLike = weather?.weather?.feels_like;
  const weatherIcon = weather?.weather?.icon;
  const weatherDescription = weather?.weather?.description;


  return (
    <div className={`weather-card ${isDayTime ? 'day-theme' : 'night-theme'}`}>
      <div className="header">
        <h4>CURRENT WEATHER</h4>
        <p className="weather-time">{localTimeString}</p>
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
        {selectedLocation && (
          <div>
            <Link to="/forecast" className="link">Hourly Weather</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherDisplay;
