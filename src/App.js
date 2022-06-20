import React, { useEffect, useState } from "react";
import "./App.css";
//CURENT
//https://api.openweathermap.org/data/2.5/weather?lat=51.50&lon=-0.1257&appid=9a5f765dda744649945dcc4179975b67&units=metric

//FORECAST
// https://api.openweathermap.org/data/2.5/forecast?lat=51.50&lon=-0.1257&appid=9a5f765dda744649945dcc4179975b67&units=metric

function App() {
  const [weatherState, setWeatherState] = useState({
    main: {},
    weather: [{ main: "" }],
    wind: {},
  });

  const [forecastState, setForecastState] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/weather.json")
      .then((response) => response.json())
      .then((data) => setWeatherState(data));

    fetch("http://localhost:3000/forecast.json") 
      .then((response) => response.json()) 
      .then((data) => {
        const days = [];
        for (var i=0; i < data.list.length; i+=8){
          days.push(data.list[i])
        }
        setForecastState(days)
      });
  });

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
            <p>{weatherState.name}</p>
          </div>
          <div className="temp">
            <h2>{Math.round(weatherState.main.temp)}°C</h2>
            <p>{weatherState.weather[0].main}</p>
            <p>
              H:{Math.round(weatherState.main.temp_min)}° L:
              {Math.round(weatherState.main.temp_max)}°
            </p>
          </div>
          <div className="description">
            <p>Today 20.06.2022</p>
          </div>
        </div>
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <p>5-DAYS Forecast</p>
            </div>
            <div className="flipCardBack">
             { forecastState.map((element)=> <p>{element.dt_txt}</p>)}
             
            </div>
          </div>
        </div>
        <div className="details">
          <div className="feels">
            <p className="bold">{Math.round(weatherState.main.feels_like)}°C</p>
            <p>Feels like</p>
          </div>
          <div className="humidity">
            <p className="bold">{weatherState.main.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{weatherState.wind.speed}MPH</p>
            <p>Wind Speed</p>
          </div>
          <div className="pressure">
            <p className="bold">{weatherState.main.pressure}hPa</p>
            <p>Pressure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
