import React from 'react';
import { Link } from 'react-router-dom';
import './Forecast.css';

function Forecast({ forecastData, loading, location }) {
  if (loading) return <p>Loading...</p>;

  if (!forecastData || forecastData.length === 0) return <p>No forecast data available.</p>;

  return (
    <div>
      <div className="forecast-header">
        {location && <h2 className="location-name">{location.city_name}, {location.country}</h2>}
        <h4 className="forecast-type">5-Day Forecast</h4>
      </div>
        <div className="forecast-card-container">
          {forecastData.map((data, index) => {
            const { date, temp_max, temp_min, weather_description, icon } = data;

            return (
              <div key={index} className="forecast-card">
                <div className="forecast-icon">
                  {icon && <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={weather_description} />}
                </div>
                <div className="forecast-details">
                  <div className="forecast-date">{date}</div>
                  <div className="forecast-temp-max">Max Temp: {temp_max}°</div>
                  <div className="forecast-temp-min">Min Temp: {temp_min}°</div>
                  <div className="forecast-description">{weather_description}</div>
                </div>
              </div>
            );
          })}
        </div>
          <Link to="/" className="link">Return to Current Weather</Link> {/* Add this line */}
    </div>
  );
}

export default Forecast;
