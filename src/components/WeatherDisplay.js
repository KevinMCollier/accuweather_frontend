import React from 'react';

function WeatherDisplay({ weather }) {
  if (!weather) return null;

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp} degrees</p>
      <p>Feels like: {weather.main.feels_like} degrees</p>
      <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
    </div>
  );
}

export default WeatherDisplay;
