import React from "react";

function getDayDisplayName(day) {
    var weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    return weekdays[day];
  }
  
  function DayForecastComponent({ day }) {
    const date = new Date(day.dt_txt);
    const name = getDayDisplayName(date.getDay());
    const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
  
    return (
      <div>
        {name}
        <div className="forecastDays">{Math.round(day.main.temp)}°C</div>
        <div>{day.main.humidity}%</div>
        <div>{day.weather[0].main}</div>
        <div>
          <img src={iconUrl} />
        </div>
      </div>
    );
  }

export default DayForecastComponent;