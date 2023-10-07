import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function ForecastContainer({ location, handleSearchResult }) {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const aggregateForecast = (data) => {
    const aggregatedData = data.reduce((acc, cur) => {
      const date = cur.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = {
          temp_max: cur.main.temp_max,
          temp_min: cur.main.temp_min,
          weather: [cur.weather[0]]
        };
      } else {
        acc[date].temp_max = Math.max(acc[date].temp_max, cur.main.temp_max);
        acc[date].temp_min = Math.min(acc[date].temp_min, cur.main.temp_min);
        acc[date].weather.push(cur.weather[0]);
      }
      return acc;
    }, {});

    const finalData = Object.keys(aggregatedData).map(date => {
      const weatherDescription = aggregatedData[date].weather.reduce((acc, cur) => {
        acc[cur.description] = (acc[cur.description] || 0) + 1;
        return acc;
      }, {});

      const mostFrequentWeather = Object.keys(weatherDescription).reduce((a, b) => weatherDescription[a] > weatherDescription[b] ? a : b);

      const iconForMostFrequentWeather = aggregatedData[date].weather.find(w => w.description === mostFrequentWeather).icon;
      return {
        date,
        temp_max: aggregatedData[date].temp_max,
        temp_min: aggregatedData[date].temp_min,
        weather_description: mostFrequentWeather,
        icon: iconForMostFrequentWeather
      };
    });

    return finalData;
  }

  useEffect(() => {
    if (!location) return;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/locations/forecast?query=${location.city_name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json();
      })
      .then(data => {
        const aggregatedData = aggregateForecast(data.list);
        setForecastData(aggregatedData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [location]);

  const handleNavbarSearch = (data) => {
    handleSearchResult(data);
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Navbar onSearch={handleNavbarSearch} />
      {loading ? <div>Loading...</div> : <Forecast forecastData={forecastData} />}
    </div>
  )
}

export default ForecastContainer;
