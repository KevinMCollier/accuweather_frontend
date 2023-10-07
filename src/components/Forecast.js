import React from 'react';
import { Link } from 'react-router-dom';
import './Forecast.css';

function Forecast({ forecastData, loading }) {
  if (loading) return <p>Loading...</p>;

  if (!forecastData || forecastData.length === 0) return <p>No forecast data available.</p>;

  return (
    <div>
      <Link to="/" className="link">Return to Current Weather</Link> {/* Add this line */}
      <div className="forecast-card-container">
        {forecastData.map((data, index) => {
          const { date, temp_max, temp_min, weather_description } = data;
          // const weatherIcon = data?.weather[0]?.icon;


          return (
            <div key={index} className="forecast-card">
              {/* <div className="forecast-icon">
                {weatherIcon && <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={weatherDescription} />}
              </div> */}
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
    </div>
  );
}

export default Forecast;
