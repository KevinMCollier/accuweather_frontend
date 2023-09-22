import React from 'react';

function Forecast({ forecastData }) {
  if (!forecastData) return null;

  return (
    <div className="forecast-card">
      {forecastData.map((data, index) => {
        const temperature = data?.weather?.temperature;
        const feelsLike = data?.weather?.feels_like;
        const weatherIcon = data?.weather?.icon;
        const weatherDescription = data?.weather?.description;

        return (
          <div key={index} className="forecast-item">
            <div className="forecast-icon">
              {weatherIcon && <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={weatherDescription} />}
            </div>
            <div className="forecast-temperature">{temperature}°</div>
            <div className="forecast-feels-like">Feels like {feelsLike}°</div>
            <div className="forecast-description">{weatherDescription}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Forecast;
