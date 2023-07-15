import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { getWeatherIcon } from "../util/weatherUtil";

const WeatherForecast = ({ city, unit, convertTemperature }) => {
  console.log(unit, convertTemperature, "unit");
  const [forecastData, setForecastData] = useState([]);
  const [isCityChanged, setIsCityChanged] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = "895284fb2d2c50a520ea537456963d9c";
      const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
      try {
        const response = await axios.get(API_URL);
        const forecast = response.data.list;
        setForecastData(forecast);
      } catch (error) {
        console.log(error);
      }
    };

    if (isCityChanged) {
      fetchWeatherData();
    }
  }, [city, isCityChanged]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsCityChanged(true);
    }
  };

  const filteredForecastData = forecastData.slice(0, 5);

  return (
    <>
      <div className="forecast section-color">
        {filteredForecastData.map((data) => (
          <div  class="forecast-container "key={data.dt}>
            <span class="forecast-desc center cl-black">{moment(data.dt_txt).format("MMM DD")}</span>
            <span class="forecast-desc center cl-black">
              {convertTemperature(data.main.temp)}
              {unit === "celsius" ? "°C" : "°F"}
            </span>
            <span class="forecast-desc cl-black">{data.weather[0].description}</span>
            <span class="forecast-desc center">{getWeatherIcon(data.weather[0].icon)}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherForecast;
