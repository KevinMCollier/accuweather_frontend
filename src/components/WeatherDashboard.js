import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import WeatherData from './WeatherData';
import Navbar from './Navbar';  // Make sure to import Navbar

function WeatherDashboard({ selectedLocation, handleSearchResult }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const DEFAULT_LOCATION = 'Tokyo';
  console.log('Rendering WeatherDashboard with selectedLocation:', selectedLocation);

//   useEffect(() => {
//     const fetchLocation = selectedLocation ? selectedLocation.city_name : DEFAULT_LOCATION;

//     console.log('About to fetch weather for:', fetchLocation);
//     fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/locations/search?query=${fetchLocation}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       setWeather(data);
//       setLoading(false);
//       if (!selectedLocation) {
//         handleSearchResult(data);
//       }
//     })
//     .catch(error => {
//       console.error("There was an error fetching the weather data", error);
//       setLoading(false);
//     });
// }, [selectedLocation, handleSearchResult]); // useEffect will re-run if selectedLocation changes
//   // console.log(selectedLocation);

useEffect(() => {
  const fetchLocation = selectedLocation ? selectedLocation.city_name : DEFAULT_LOCATION;

  // You might want to fetch only if selectedLocation is not set
  if (!selectedLocation) {
    console.log('About to fetch weather for:', fetchLocation);
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
        handleSearchResult(data); // Update parent state only when fetching data
      })
      .catch(error => {
        console.error("There was an error fetching the weather data", error);
        setLoading(false);
      });
  } else {
    setWeather(selectedLocation); // If selectedLocation is set, use it directly without fetching
    setLoading(false);
  }
}, [selectedLocation, handleSearchResult]); // Adjust dependencies based on your logic

  return (
    <div>
      <Navbar weather={weather} loading={loading} onSearch={handleSearchResult} searchedCityName={selectedLocation} />
      {weather && <WeatherData weather={weather} loading={loading} selectedLocation={selectedLocation} haiku={weather.haiku} />}
    </div>
  );
}

export default WeatherDashboard;
