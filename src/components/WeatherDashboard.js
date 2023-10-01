import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WeatherData from './WeatherData';
import Navbar from './Navbar';  // Make sure to import Navbar

function WeatherDashboard({ selectedLocation, handleSearchResult }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const DEFAULT_LOCATION = 'Tokyo';

  useEffect(() => {
    const fetchLocation = selectedLocation || DEFAULT_LOCATION;

    fetch(`http://localhost:3000/api/v1/locations/search?query=${fetchLocation}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setWeather(data);
      setLoading(false);
      if (!selectedLocation) {
        handleSearchResult(data);
      }
    })
    .catch(error => {
      console.error("There was an error fetching the weather data", error);
      setLoading(false);
    });
}, [selectedLocation, handleSearchResult]); // useEffect will re-run if selectedLocation changes

  return (
    <div>
      <Navbar weather={weather} loading={loading} onSearch={handleSearchResult} searchedCityName={selectedLocation} />
      {selectedLocation && (
        <div>
          <Link to="/forecast" className="link">5-Day</Link>
        </div>
      )}
      {weather && <WeatherData weather={weather} loading={loading} />}
    </div>
  );
}

export default WeatherDashboard;
