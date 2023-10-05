import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import WeatherData from './WeatherData';
import Navbar from './Navbar';  // Make sure to import Navbar

function WeatherDashboard({ selectedLocation, handleSearchResult }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const DEFAULT_LOCATION = 'Tokyo';

  useEffect(() => {
    const fetchLocation = selectedLocation ? selectedLocation.city_name : DEFAULT_LOCATION;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/locations/search?query=${fetchLocation}`)
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
  // console.log(selectedLocation);

  return (
    <div>
      <Navbar weather={weather} loading={loading} onSearch={handleSearchResult} searchedCityName={selectedLocation} />
      {weather && <WeatherData weather={weather} loading={loading} selectedLocation={selectedLocation} />}
    </div>
  );
}

export default WeatherDashboard;
