import React, { useState } from "react";
import './WeatherApp.css'
import Cloudy from "../Assets/cloudy.png"
import Drizzle from "../Assets/Drizzle.png"
import Humidity from "../Assets/Humidity.png"
import Rainy from "../Assets/Rainy.png"
import Search from "../Assets/Search.svg"
import Snowy from "../Assets/Snowy.png"
import Sunny from "../Assets/Sunny.png"
import Windy from "../Assets/Windy.svg"
const WeatherApp = () => {
  let apikey = "3db773d16d35eb8f327a0d5f3378d469";
  const [wicon,setWicon] = useState(Cloudy);
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if(element[0].value === "")
    {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apikey}`;
    let response = await fetch(url);
    if(response.ok) {
      let data = await response.json();
    
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) +" °c";
    location[0].innerHTML = data.name;
    if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
    {
      setWicon(Sunny);
    }
    else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
    {
      setWicon(Cloudy);
    }
    else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
    {
      setWicon(Drizzle);
    }
    else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
    {
      setWicon(Drizzle);
    }
    else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
    {
      setWicon(Rainy);
    }
    else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
    {
      setWicon(Rainy);
    }
    else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
    {
      setWicon(Snowy);
    }
    else
    {
      setWicon(Sunny)
    }
    }
    if(response.status === 404)
    {
      alert("city not found!");
    }

    
  }
  
    return(
  <div className = "container">
   <div className = "top-bar">
    <input type = "text" className = "cityInput" placeholder="Search"/>
    <div className = "search" onClick = {() => {search()}}>
        <img src = {Search}  alt = "search-icon" height="30vh" width="30vw"/>
    </div>
   </div>
   <div className = "weather-image" >
   <img src = {wicon}  alt = "cloud-icon" height="120vh" width="120vw"/>
   </div>
   <div className = "weather-temp" >24°c</div>
   <div className = "weather-location" >London</div>
   <div className = "data-container">
    <div className = "element">
     <img src = {Humidity} alt = "" className = "icon first" height="45vh" width="45vw"/>
     <div className = "data">
       <div className = "humidity-percent">64%</div>
       <div className = "text">Humidity</div>
     </div>
    </div>
    <div className = "element">
     <img src = {Windy} alt = "" className = "icon second " height="45vh" width="45vw"/>
     <div className = "data second">
       <div className = "wind-rate">18km/h</div>
       <div className = "text">Wind Speed</div>
     </div>
    </div>
   </div>
  </div>
    );
}
export default WeatherApp