import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Dashboard.css";

function GetDayDisplayName(day) {
  var weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  var displayName = weekdays[day];
  return displayName;
}

function DayForecastComponent({ day }) {
  const date = new Date(day.dt_txt);
  const name = GetDayDisplayName(date.getDay());
  const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`

  return (
    <div>
      {name}
      <div className="forecastDays">{Math.round(day.main.temp)}°C</div>
      <div>{day.main.humidity}%</div>
      <div>{day.weather[0].main}</div>
      <div><img src={iconUrl}/></div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const params = useParams();
  const [weatherState, setWeatherState] = useState({
    main: {},
    weather: [{ main: "" }],
    wind: {},
  });

  const [forecastState, setForecastState] = useState([]);

  console.log("create component");
  useEffect(() => {
    console.log("useEffect");

    const locationDetailsUrl = "http://localhost:3000/location.json";
    // const locationDetailsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${params.location}&limit=1&appid=9a5f765dda744649945dcc4179975b67`;

    fetch(locationDetailsUrl)
      .then((response) => response.json())
      .then((data) => {
        const lat = data[0].lat;
        const lon = data[0].lon;
        console.log(lat);
        console.log(lon);

        const currentWeatherUrl = "http://localhost:3000/weather.json";
        // const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9a5f765dda744649945dcc4179975b67&units=metric`;

        fetch(currentWeatherUrl)
          .then((response) => response.json())
          .then((data) => setWeatherState(data));

        const forecastWeatherUrl = "http://localhost:3000/forecast.json";
        // const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9a5f765dda744649945dcc4179975b67&units=metric`;
        fetch(forecastWeatherUrl)
          .then((response) => response.json())
          .then((data) => {
            const days = [];
            for (var i = 0; i < data.list.length; i += 8) {
              days.push(data.list[i]);
            }
            setForecastState(days);
          });
      });
  }, [params.location]);

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="location">
            {/* <input
              className="input"
              type="text"
              placeholder="&#128269; Enter Location"
              value={params.location}
            ></input>
            <button className="searchButton" type="button">
              Search
            </button> */}
            <button
              className="back"
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </button>
            <p>{weatherState.name}</p>
          </div>
          <div className="temp">
            <h2>{Math.round(weatherState.main.temp)}°C</h2>
            <p>{weatherState.weather[0].main}</p>
            <p>
              H:{Math.round(weatherState.main.temp_max)}° L:
              {Math.round(weatherState.main.temp_min)}°
            </p>
          </div>
          {/* <div className="date">
            <p>Today 20.06.2022</p>
          </div> */}
        </div>
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

export default Dashboard;
