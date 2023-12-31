import React, { useState, useEffect } from 'react';
import './LocationsList.css';


function LocationsList({ setSelectedLocationId }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch('http://localhost:3000/api/v1/locations')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLocations(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="locations-header">
        <h3 className="locations-title">Saved Locations</h3>
        <ul className="location-name">
          {locations.map(location => (
            <li key={location.id}>
              <button onClick={()=> setSelectedLocationId(location.id)}>{location.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LocationsList;
