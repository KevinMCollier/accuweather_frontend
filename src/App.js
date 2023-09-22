import './App.css';
import './assets/styles/global.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard';
import ForecastContainer from './components/ForecastContainer';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="App">
      <Router>
        <main>
          <WeatherDashboard
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />

          {selectedLocation && (
            <div className="forecast-link">
              <Link to="/forecast">View 48-hour Forecast</Link>
            </div>
          )}

        <Routes>
          <Route path="/forecast" element={<ForecastContainer location={selectedLocation} />} />
        </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
