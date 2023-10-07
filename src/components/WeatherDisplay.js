import React, { useState } from 'react';
import './WeatherDisplay.css';
import { Link } from 'react-router-dom';



function WeatherDisplay({ weather, selectedLocation, isDayTime, haiku }) {
  const [showEnglish, setShowEnglish] = useState(false);

  if (!weather) return null;

  const timezone = weather?.timezone;
  const localTimeInMilliseconds = Date.now() + (timezone * 1000);
  const localTimeString = new Date(localTimeInMilliseconds).toLocaleString('en-US', {timeZone: 'UTC'});

  const temperature = weather?.weather?.temperature;
  const feelsLike = weather?.weather?.feels_like;
  const weatherIcon = weather?.weather?.icon;
  const weatherDescription = weather?.weather?.description;


  return (
    <div className="cards-container">
      <div className={`card weather-card ${isDayTime ? 'day-theme' : 'night-theme'}`}>
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
        {haiku && (
          <div className={`card haiku card ${isDayTime ? 'day-theme' : 'night-theme'}`} onClick={() => setShowEnglish(!showEnglish)}>
            {showEnglish ? (
              <div className="haiku-container-en">
                <p>{haiku.line_1_en}</p>
                <p>{haiku.line_2_en}</p>
                <p>{haiku.line_3_en}</p>
              </div>
            ) : (
            <div className="haiku-container-jp">
              <p>{haiku.line_1_jp}</p>
              <p>{haiku.line_2_jp}</p>
              <p>{haiku.line_3_jp}</p>
            </div>
            )}
            <p className="language-setting">
              <span style={{fontWeight: showEnglish ? 'normal' : 'bold'}}>Jp</span> |
              <span style={{fontWeight: showEnglish ? 'bold' : 'normal'}}> En</span>
            </p>
          </div>
        )}
      </div>
  );
}

export default WeatherDisplay;
