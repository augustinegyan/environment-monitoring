import React, { useState, useEffect } from 'react';
import './WeatherDashboard.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import SignalStrengthChart from './SignalStrengthChart';
import BatteryIndicator from './BatteryIndicator'; // Import the BatteryIndicator component

// Leaflet icon configuration
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const WeatherDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [city, setCity] = useState('Your City');
  const [signalStrength, setSignalStrength] = useState(0); // Initial signal strength
  const [batteryLevel, setBatteryLevel] = useState(100); // Initial battery level

  useEffect(() => {
    // Update current date and time every second
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Simulate signal strength updates
    const strengthInterval = setInterval(() => {
      setSignalStrength(Math.floor(Math.random() * 6));
    }, 3000); // Update every 3 seconds

    // Simulate battery level updates
    const batteryInterval = setInterval(() => {
      // Simulate battery drainage between 100% and 0%
      setBatteryLevel(Math.floor(Math.random() * 101)); // Update battery level
    }, 3000); // Update every 3 seconds

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );

    return () => {
      clearInterval(interval);
      clearInterval(strengthInterval);
      clearInterval(batteryInterval);
    };
  }, []);

  return (
    <div className="weather-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <a href="#" className="logo">
            <img src="/assets/images/gaia_logo.png" width="264" height="35" alt="Gaia logo" />
          </a>
        </div>

        <div className="header-right">
          <div className="signal-indicator">
            <SignalStrengthChart signalStrength={signalStrength} />
          </div>
          <div className="battery-indicator">
            <BatteryIndicator chargeLevel={batteryLevel} /> {/* Add BatteryIndicator component */}
          </div>
          <div className="status-indicator">
            <span className="blinking"></span> OFFLINE
          </div>
        </div>
      </header>
      <div className="main-content">
        <div className="left-section">
         <div className="current-weather">
            <div className="temperature">
            23°C <img src="/assets/images/weather_icons/02d.png"  alt="Sunny Weather"  className="weather-icon" />
            </div>
            <div className="weather-description">Sunny</div>

            <div className="info-row">
              <i className="material-icons">calendar_today</i>
              <div className="date">{currentDate.toLocaleDateString()}</div>
            </div>

            <div className="info-row">
              <i className="material-icons">access_time</i>
              <div className="time icon-text">{currentDate.toLocaleTimeString()}</div>
            </div>

            <div className="info-row">
              <i className="material-icons">location_on</i>
              <div className="location icon-text">{city}</div>
            </div>
          </div>

          <h2 className="forecast-title">Environment Readings</h2>
          <div className="hourly-forecast">
              <div className="hourly-grid">
                  <div className="reading-item">
                    <i className="material-icons reading-icon">water_drop</i>
                   <div className="reading-value">Humidity: 65%</div>
              </div>
              <div className="reading-item">
                   <i className="material-icons reading-icon">speed</i>
                   <div className="reading-value">Pressure: 1012 hPa</div>
              </div>
              <div className="reading-item">
                  <i className="material-icons reading-icon">air</i>
                 <div className="reading-value">Air Quality: Good</div>
              </div>
           </div>

          </div>
        </div>

        <div className="map-container">
          <h2 className="map-title">Your Location on Map</h2>
          <MapContainer
            center={location}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location}>
              <Popup>Your location</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="right-section">
          <h2 className="forecast-title">Details Not Yet In</h2>
          <div className="daily-forecast">
            {/* You can display future environment reading details here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
