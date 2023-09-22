import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';

function ForecastContainer({ location }) {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    fetch(`http://localhost:3000/api/v1/locations/forecast?query=${location}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json();
      })
      .then(data => {
        setForecastData(data.list);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [location]);  // <- Here, fetch the forecast every time the location changes.

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <Forecast forecastData={forecastData} />;
}

export default ForecastContainer;
