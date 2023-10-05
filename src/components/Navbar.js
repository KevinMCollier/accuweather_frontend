import React, { useState } from 'react';
import './Navbar.css'

function Navbar({ weather, loading, onSearch, searchedCityName }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults] = useState(null);

  const handleSearch = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/locations/search?query=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      // setSearchResults(data);
      onSearch(data);
    })
    .catch(error => {
      console.error("Error searching for location: ", error);
    });
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-location-container">
          {weather ? weather.name : 'Weather'}
        </div>

        {weather && (
          <div className="navbar-current-weather">
            <h3 className="navbar-location-name">{searchedCityName.city_name}</h3>
            <div className="navbar-temperature">{weather.weather.temperature}°</div>
            {weather.weather.icon &&
              <img src={`http://openweathermap.org/img/w/${weather.weather.icon}.png`} alt="weather icon" className="weather-icon" />
            }
          </div>
        )}


        {/* Search Functionality */}
        <div className="search-container">
          <input
          type="text"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          {/* Optionally display search results, you can style and expand this section */}
          {searchResults && (
            <div className="search-results">
              {/* Render search results here */}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Navbar;
