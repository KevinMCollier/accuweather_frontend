import './App.css';
import './assets/styles/global.css'
import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kevin's Sunny Forecast 🌤</h1>
      </header>
      <main>
        <WeatherDashboard />
      </main>
    </div>
  );
}

export default App;
