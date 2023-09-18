import './App.css';
import './assets/styles/global.css'
import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';



function App() {
  return (
    <div className="App">
      <main>
        <WeatherDashboard />
      </main>
    </div>
  );
}

export default App;
