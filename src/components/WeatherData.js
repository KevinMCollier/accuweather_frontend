import React from 'react';
import WeatherDisplay from './WeatherDisplay';

function WeatherData({ weather, loading, selectedLocation }) {   // Receive the weather and loading as props
  // console.log('WeatherData selectedLocation:', selectedLocation);

  if (loading) return <div>Loading weather...</div>;

  return (
    <WeatherDisplay weather={weather} selectedLocation={selectedLocation} />
  );
}

export default WeatherData;
