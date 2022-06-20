import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="location">
            <input
              className="input"
              type="text"
              placeholder="&#128269; Enter Location"
            ></input>
            <button className="searchButton" type="button">
              Search
            </button>
            <p>Texas</p>
          </div>
          <div className="temp">
            <h2>29°C</h2>
            <p>4-DAY Forecast</p>
          </div>
          <div className="description">
            <p>Cloudy</p>
          </div>
        </div>
        <div className="details">
          <div className="feels">
            <p className="bold">30°C</p>
            <p>Feels like</p>
          </div>
          <div className="humidity">
            <p className="bold">18%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">12 MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
