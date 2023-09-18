import React from 'react';

function WeatherDisplay({ weather }) {
  console.log(weather);
  if (!weather) return null;

  const temperature = weather?.weather?.temperature;
  const feelsLike = weather?.weather?.feels_like;
  const weatherIcon = weather?.weather?.icon;
  const weatherDescription = weather?.weather?.description;
  const minTemperature = weather?.weather?.temp_min;
  const maxTemperature = weather?.weather?.temp_max;
  const humidity = weather?.weather?.humidity;


  return (
    <div>
      <h2>{weather.name}</h2>
      {temperature && <p>Temperature: {temperature}°C</p>}
      {feelsLike && <p>Feels like: {feelsLike}°C</p>}
      {minTemperature && <p>Min Temperature: {minTemperature}°C</p>}
      {maxTemperature && <p>Max Temperature: {maxTemperature}°C</p>}
      {humidity && <p>Humidity: {humidity}%</p>}
      {weatherIcon && <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={weatherDescription} />}
      {weatherDescription && <p>{weatherDescription}</p>}
    </div>
  );
}

export default WeatherDisplay;
