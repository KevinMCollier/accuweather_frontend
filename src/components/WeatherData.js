import React from 'react';
import WeatherDisplay from './WeatherDisplay';

function WeatherData({ weather, loading }) {   // Receive the weather and loading as props
  if (loading) return <div>Loading weather...</div>;

  return (
    <WeatherDisplay weather={weather} />
  );
}

export default WeatherData;
