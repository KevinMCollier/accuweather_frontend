import React, { useState } from 'react';
import LocationsList from './LocationsList';
import WeatherData from './WeatherData';


function WeatherDashboard() {
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  return (
    <div>
      <LocationsList setSelectedLocationId={setSelectedLocationId} />
      {selectedLocationId && <WeatherData locationId={selectedLocationId} />}
    </div>
  );
}

export default WeatherDashboard;
