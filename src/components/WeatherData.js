import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';

function WeatherData({ locationId }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/locations/${locationId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the weather data", error);
        setLoading(false);
      });
  }, [locationId]);

  if (loading) return <div>Loading weather...</div>;

  return (
    <WeatherDisplay weather={weather} />
  );
}

export default WeatherData;
