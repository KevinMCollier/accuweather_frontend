import React, { useState, useEffect } from 'react';
import LocationsList from './LocationsList';
import WeatherData from './WeatherData';
import Navbar from './Navbar';  // Make sure to import Navbar

function WeatherDashboard() {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleSearchResult = (data) => {
    setWeather(data);
    setLoading(false);
  }

  useEffect(() => {
    if (!selectedLocationId) return;  // Only fetch if a location is selected

    fetch(`http://localhost:3000/api/v1/locations/${selectedLocationId}`)
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
  }, [selectedLocationId]);

  return (
    <div>
      <Navbar weather={weather} loading={loading} onSearch={handleSearchResult} />
      <LocationsList setSelectedLocationId={setSelectedLocationId} />
      {selectedLocationId && <WeatherData weather={weather} loading={loading} />}
    </div>
  );
}

export default WeatherDashboard;
