import './App.css';
import './assets/styles/global.css';
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard';
import ForecastContainer from './components/ForecastContainer';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearchResult = useCallback((data) => {
    setSelectedLocation(data.city_name);
  }, []);

  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <WeatherDashboard
                    selectedLocation={selectedLocation}
                    handleSearchResult={handleSearchResult}
                  />
                </>
              }
            />
            <Route
              path="/forecast"
              element={
                <>
                  <ForecastContainer
                    location={selectedLocation}
                    handleSearchResult={handleSearchResult}
                  />
                </>
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
