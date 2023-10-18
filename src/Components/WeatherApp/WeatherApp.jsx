import "./style.css";
import React, { useState } from "react";

import search_icon from "../Assets/Images/search.png";
import snow_icon from "../Assets/Images/snow.png";
import clear_icon from "../Assets/Images/clear.png";
import cloud_icon from "../Assets/Images/clouds.png";
import drizzle_icon from "../Assets/Images/drizzle.png";
import humidity_icon from "../Assets/Images/humidity.png";
import mist_icon from "../Assets/Images/mist.png";
import rain_icon from "../Assets/Images/rain.png";
import wind_icon from "../Assets/Images/wind.png";
//Import Ends

const WeatherApp = () => {
  // Variables
  let inputField = document.querySelector(".cityInput");
  let Btn = document.querySelector(".search-icon");
  let temp = document.querySelector(".weather-temp");
  let location = document.querySelector(".weather-location");
  let humidity = document.querySelector(".humidity-percent");
  let windSpeed = document.querySelector(".wind-speed");
  let errorMsg = document.querySelector(".Error");
  let HideMsg = document.querySelector(".Hide");
  let Empty = document.querySelector(".Empty");
  // API
  let api_key = "1decd11a9b89824a788a1a11921b6023";
  // UseState
  const [weatherIcon, setWetherIcon] = useState(cloud_icon);
  const search = async () => {
    if (inputField.value === "") {
      Empty.style.display = "flex";
      errorMsg.style.display = "none";
      HideMsg.style.display = "none";
      // return 0;
    }
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&units=metric&appid=${api_key}`;
    let resource = await fetch(URL);
    let Data = await resource.json();
    //
    if (resource.status === 404) {
      errorMsg.style.display = "flex";
      HideMsg.style.display = "none";
      Empty.style.display = "none";
    } else {
      //
      Empty.style.display = "none";
      HideMsg.style.display = "block";
      temp.innerHTML = Math.floor(Data.main.temp) + "°C";
      location.innerHTML = Data.name;
      windSpeed.innerHTML = Math.floor(Data.wind.speed) + " km/h";
      humidity.innerHTML = Data.main.humidity + " %";
      errorMsg.style.display = "none";
    }
    if (Data.weather[0].icon === "01d" || Data.weather[0].icon === "01n") {
      setWetherIcon(clear_icon);
    } else if (
      Data.weather[0].icon === "02d" ||
      Data.weather[0].icon === "02n"
    ) {
      setWetherIcon(cloud_icon);
    } else if (
      Data.weather[0].icon === "03d" ||
      Data.weather[0].icon === "03n"
    ) {
      setWetherIcon(drizzle_icon);
    } else if (
      Data.weather[0].icon === "04d" ||
      Data.weather[0].icon === "04n"
    ) {
      setWetherIcon(mist_icon);
    } else if (
      Data.weather[0].icon === "09d" ||
      Data.weather[0].icon === "09n"
    ) {
      setWetherIcon(rain_icon);
    } else if (
      Data.weather[0].icon === "10d" ||
      Data.weather[0].icon === "10n"
    ) {
      setWetherIcon(rain_icon);
    } else if (
      Data.weather[0].icon === "13d" ||
      Data.weather[0].icon === "13n"
    ) {
      setWetherIcon(snow_icon);
    } else if (
      Data.weather[0].icon === "50d" ||
      Data.weather[0].icon === "50n"
    ) {
      setWetherIcon(mist_icon);
    } else {
      setWetherIcon(cloud_icon);
    }
  };
  const something = (event) => {
    if (event.keyCode === 13) {
      Btn.click();
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Enter City"
          onKeyDown={(e) => {
            something(e);
          }}
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}>
          <img src={search_icon} alt="" className="search_icon" />
        </div>
      </div>
      <div className="Empty">
        <p>Enter City To get Weather </p>
      </div>
      <div className="Error">
        <p>!Invalid City</p>
        <p> Please Enter Correct City</p>
      </div>
      <div className="Hide">
        <div className="weather-image">
          <img src={weatherIcon} alt="" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">65%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-speed">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
