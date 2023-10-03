import React from 'react';
import './WeatherDisplay.css';


function WeatherDisplay({ weather }) {
  console.log(weather);
  if (!weather) return null;

  const timezone = weather?.timezone;
  const localTimeInMilliseconds = Date.now() + (timezone * 1000);
  console.log("Current time (UTC):", new Date(Date.now()).toUTCString());
  console.log("Timezone offset (seconds):", timezone);
  console.log("Adjusted time (Local):", new Date(localTimeInMilliseconds).toLocaleString());
  console.log("Adjusted time (UTC):", new Date(localTimeInMilliseconds).toUTCString());

  const currentTimeUTC = new Date(localTimeInMilliseconds).toUTCString();
  const currentTime = currentTimeUTC.split(' ')[4]; // Extracting time from the UTC string

  const temperature = weather?.weather?.temperature;
  const feelsLike = weather?.weather?.feels_like;
  const weatherIcon = weather?.weather?.icon;
  const weatherDescription = weather?.weather?.description;


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
