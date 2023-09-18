import React from 'react';
import './Navbar.css'

function Navbar({ weather }) {
  if (!weather) return null;

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-location-name">{weather.name}</div>
        <div className="navbar-current-weather">
          <div className="navbar-temperature">{weather.weather.temperature}°</div>
          {weather.weather.icon &&
            <img src={`http://openweathermap.org/img/w/${weather.weather.icon}.png`} alt="weather icon" className="weather-icon" />
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
