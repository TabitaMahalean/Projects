import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  let navigate= useNavigate();
  const [location,setLocation] = useState('');

  return (

    <div className="app">
      <div className="homepage-container">
        <h2>Weather</h2>
        <div className="search">
          <input
            className="input"
            type="text"
            value={location}
            placeholder="&#128269; Enter Location"
            onChange={e=>{setLocation(e.target.value)}}
          ></input>
          <button className="searchButton" type="button" onClick={()=>{navigate(`/dashboard/${location}`)}}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
