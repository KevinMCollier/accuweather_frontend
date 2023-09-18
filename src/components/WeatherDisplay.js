import React from 'react';

function WeatherDisplay({ weather }) {
  console.log(weather);
  if (!weather) return null;

  const temperature = weather?.weather?.temperature;
  const feelsLike = weather?.weather?.feels_like;
  const weatherIcon = weather?.weather?.icon;
  const weatherDescription = weather?.weather?.description;

  return (
    <div>
      <h2>{weather.name}</h2>
      {temperature && <p>Temperature: {temperature} degrees</p>}
      {feelsLike && <p>Feels like: {feelsLike} degrees</p>}
      {weatherIcon && weatherDescription && (
        <img
          src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
          alt={weatherDescription}
        />
      )}
    </div>
  );
}

export default WeatherDisplay;
