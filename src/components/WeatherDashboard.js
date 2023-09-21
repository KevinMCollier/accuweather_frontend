import React, { useState, useEffect } from 'react';
// import LocationsList from './LocationsList';
import WeatherData from './WeatherData';
import Navbar from './Navbar';  // Make sure to import Navbar

function WeatherDashboard() {
  const [selectedLocationId] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchedCityName, setSearchedCityName] = useState("");
  const DEFAULT_LOCATION = 'Tokyo';
  const handleSearchResult = (data) => {
    setWeather(data);
    setSearchedCityName(data.city_name);
    setLoading(false);
  }

  useEffect(() => {
    if (selectedLocationId) {
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
    } else {
            // Default fetch when the component mounts for the DEFAULT_LOCATION
      fetch(`http://localhost:3000/api/v1/locations/search?query=${DEFAULT_LOCATION}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWeather(data);
        setSearchedCityName(data.city_name);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the weather data", error);
        setLoading(false);
      });
    }
  }, [selectedLocationId]);

  return (
    <div>
      <Navbar weather={weather} loading={loading} onSearch={handleSearchResult} searchedCityName={searchedCityName} />
      {/* <LocationsList setSelectedLocationId={setSelectedLocationId} /> */}
      {weather && <WeatherData weather={weather} loading={loading} />}
    </div>
  );
}

export default WeatherDashboard;
