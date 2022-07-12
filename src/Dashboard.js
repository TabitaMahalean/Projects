import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Dashboard.css";
import DayForecastComponent from "./components/DayForecastComponent";

function Dashboard() {
  const navigate = useNavigate();
  const params = useParams();
  const [weatherState, setWeatherState] = useState({
    main: {},
    weather: [{ main: "" }],
    wind: {},
    sys: {},
    dt: 0,
    timezone: 0,
  });

  const [forecastState, setForecastState] = useState([]);

  useEffect(() => {
    // const locationDetailsUrl = "http://localhost:3000/location.json";
    const locationDetailsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${params.location}&limit=1&appid=9a5f765dda744649945dcc4179975b67`;

    fetch(locationDetailsUrl)
      .then((response) => response.json())
      .then((data) => {
        const lat = data[0].lat;
        const lon = data[0].lon;

        // const currentWeatherUrl = "http://localhost:3000/weather.json";
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9a5f765dda744649945dcc4179975b67&units=metric`;

        fetch(currentWeatherUrl)
          .then((response) => response.json())
          .then((data) => setWeatherState(data));

        // const forecastWeatherUrl = "http://localhost:3000/forecdddast.json";
        const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9a5f765dda744649945dcc4179975b67&units=metric`;
        fetch(forecastWeatherUrl)
          .then((response) => response.json())
          .then((data) => {
            const days = [];
            for (
              var i = 0;
              i < data.list.length;
              i += 8 //iau cate o valoare pe zi
            ) {
              days.push(data.list[i]);
            }
            setForecastState(days);
          });
      });
  }, [params.location]);

  const locationDate = new Date(weatherState.dt * 1000); //fus orar local,
  const timeZoneOffsetSeconds = locationDate.getTimezoneOffset() * 60 * 1000; //secunde intre GMT si Ora Locala
  const weatherLocationOffsetSeconds = weatherState.timezone * 1000; // secunde intre GMT si ora Locatiei unde va fi
  locationDate.setTime(
    locationDate.getTime() +
      timeZoneOffsetSeconds +
      weatherLocationOffsetSeconds
  );

  const isLoading = forecastState.length === 0;
  // const isLoading = true;
  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="location">
            <button
              className="back"
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </button>
            {!isLoading && (
              <p>
                {weatherState.name},{weatherState.sys.country}
                <br />
                {locationDate.toDateString()}
              </p>
            )}

            {isLoading && (
              <div className="loading">
                <img className="loadingIcon" src="/Loading.svg"></img>Loading
                Weather...
              </div>
            )}
          </div>
          {!isLoading && (
            <div className="temp">
              <h2>{Math.round(weatherState.main.temp)}°C</h2>
              <p>{weatherState.weather[0].main}</p>
              <p>
                H:{Math.round(weatherState.main.temp_max)}° L:
                {Math.round(weatherState.main.temp_min)}°
              </p>
            </div>
          )}
        </div>
        {!isLoading && (
          <div className="flipCard">
            <div className="flipCardInner">
              <div className="flipCardFront">
                <p>5-DAYS Forecast</p>
              </div>
              <div className="flipCardBack">
                {forecastState.map((element, index) => (
                  <DayForecastComponent day={element} key={index} />
                ))}
              </div>
            </div>
          </div>
        )}
        {!isLoading && (
          <div className="details">
            <div className="feels">
              <p className="bold">
                {Math.round(weatherState.main.feels_like)}°C
              </p>
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
        )}
      </div>
    </div>
  );
}

export default Dashboard;
