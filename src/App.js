import logo from './logo.svg';
import './App.css';
import React from 'react';
import LocationsList from './components/LocationsList';

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
        <LocationsList />
      </main>
    </div>
  );
}

export default App;
