import './App.css';
import './assets/styles/global.css';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard';
import ForecastContainer from './components/ForecastContainer';
import moment from 'moment-timezone';


function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDayTime, setIsDayTime] = useState(null);

  useEffect(() => {
    if (selectedLocation) {
      const timezone = selectedLocation.timezone;
      const localTime = moment().utc().add(timezone, 'seconds');
      const sunrise = moment.unix(selectedLocation.sunrise).utc().add(timezone, 'seconds');
      const sunset = moment.unix(selectedLocation.sunset).utc().add(timezone, 'seconds');

      const newIsDayTime = localTime.isBetween(sunrise, sunset);
      setIsDayTime(newIsDayTime);

      console.log(selectedLocation.city_name)
      console.log('Calculated Current Time:', localTime.format());
      console.log('Sunrise Time:', sunrise);
      console.log('Sunset Time:', sunset);
      console.log('Is Daytime:', newIsDayTime);  // log the result of your day/night comparison

      document.body.className = newIsDayTime ? 'day-theme' : 'night-theme';
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

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
