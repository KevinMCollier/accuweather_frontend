import logo from './logo.svg';
import './App.css';
import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Kevin's Sunny Forecast 🌤</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <WeatherDashboard />
      </main>
    </div>
  );
}

export default App;
