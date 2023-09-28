import React from 'react';
import { Link } from 'react-router-dom';
import './Forecast.css';

function Forecast({ forecastData, loading }) {
  if (loading) return <p>Loading...</p>;

  if (!forecastData || forecastData.length === 0) return <p>No forecast data available.</p>;

  return (
    <div>
      <Link to="/" className="home-link">Back</Link> {/* Add this line */}
      <div className="forecast-card-container">
        {forecastData.map((data, index) => {
          const temperature = data?.main?.temp;
          const feelsLike = data?.main?.feels_like;
          const weatherIcon = data?.weather[0]?.icon;
          const weatherDescription = data?.weather[0]?.description;
          const dateTime = data?.dt_txt;

          return (
            <div key={index} className="forecast-card">
              <div className="forecast-icon">
                {weatherIcon && <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={weatherDescription} />}
              </div>
              <div className="forecast-details">
                <div className="forecast-temperature">Temperature: {temperature}°</div>
                <div className="forecast-feels-like">Feels like {feelsLike}°</div>
                <div className="forecast-description">{weatherDescription}</div>
                <div className="forecast-date-time">{dateTime}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
