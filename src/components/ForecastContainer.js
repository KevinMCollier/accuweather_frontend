import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function ForecastContainer({ location, handleSearchResult }) {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  }, [location]);

  const handleNavbarSearch = (data) => {
    handleSearchResult(data);
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Navbar onSearch={handleNavbarSearch} />
      {loading ? <div>Loading...</div> : <Forecast forecastData={forecastData} />}
    </div>
  )
}

export default ForecastContainer;
