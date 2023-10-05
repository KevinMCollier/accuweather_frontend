import './App.css';
import './assets/styles/global.css';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard';
import ForecastContainer from './components/ForecastContainer';


function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDayTime, setIsDayTime] = useState(null);

  useEffect(() => {
    if (selectedLocation) {
      const timezone = selectedLocation.timezone; // adjust this
      const localTimeInMilliseconds = Date.now() + (timezone * 1000);
      const localTimeString = new Date(localTimeInMilliseconds).toLocaleString('en-US', {timeZone: 'UTC'});
      const currentTime = new Date(localTimeString);
      const sunrise = new Date(selectedLocation.sunrise * 1000); // adjust this
      const sunset = new Date(selectedLocation.sunset * 1000); // adjust this

      setIsDayTime(currentTime.getTime() >= sunrise.getTime() && currentTime.getTime() <= sunset.getTime());

      console.log(selectedLocation.city_name)
      console.log('Calculated Current Time:', currentTime);
      console.log('Sunrise Time:', sunrise);
      console.log('Sunset Time:', sunset);
      console.log('Is Daytime:', isDayTime);  // log the result of your day/night comparison

      document.body.className = isDayTime ? 'day-theme' : 'night-theme';
    }
  }, [selectedLocation, isDayTime]);

  const handleSearchResult = useCallback((data) => {
    setSelectedLocation(data);
  }, []);

  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                  <WeatherDashboard
                    selectedLocation={selectedLocation}
                    handleSearchResult={handleSearchResult}
                    isDayTime={isDayTime}
                  />
              }
            />
            <Route
              path="/forecast"
              element={
                  <ForecastContainer
                    location={selectedLocation}
                    handleSearchResult={handleSearchResult}
                    isDayTime={isDayTime}
                  />
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
