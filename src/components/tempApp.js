import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecast from "./weatherForecast";
import {
  calculateWindDirection,
  convertTemperature,
  getWeatherIcon,
} from "../util/weatherUtil";
import ToggleUnit from "../components/toggle";
import {
  CLEAR_IMAGE,
  CLOUDS_IMAGE,
  DEFAULT_WEATHER,
  DRIZZLE_IMAGE,
  MIST_IMAGE,
  RAIN_IMAGE,
} from "../constants/weatherIcon";

function TempApp() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("celsius");
  const [windDirection, setWindDirection] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(DEFAULT_WEATHER);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setBackgroundImage(getBackgroundImage(response.data.weather[0].main));
          const windDegree = response.data.wind.deg;
          const windDirection = calculateWindDirection(windDegree);
          setWindDirection(windDirection);
        })
        .catch((error) => {
          if (error.response && error.response.status === 429) {
            setError("API rate limit exceeded. Please try again later.");
          } else {
            setError("An error occurred while fetching weather data.");
          }
        });
      setLocation("");
    }
  };
  const getBackgroundImage = (weatherCondition) => {
    const backgroundImages = {
      Mist: MIST_IMAGE,
      Clear: CLEAR_IMAGE,
      Clouds: CLOUDS_IMAGE,
      Rain: RAIN_IMAGE,
      Drizzle: DRIZZLE_IMAGE,
    };

    return backgroundImages[weatherCondition] || "";
  };

  useEffect(() => {
    if (data.weather) {
      setBackgroundImage(getBackgroundImage(data.weather[0].main));
    }
  }, [data.weather]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "celsius" ? "fahrenheit" : "celsius"));
  };

  return (
    <div className="app" style={backgroundStyle}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        <ToggleUnit unit={unit} onToggle={toggleUnit} />
      </div>
      <div className="container">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <div className="top center">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? (
                  <h1>
                    {convertTemperature(data.main.temp, unit)}
                    {unit === "celsius" ? "°C" : "°F"}
                  </h1>
                ) : null}
              </div>
              <div>
                {data.weather ? (
                  <div>
                    {getWeatherIcon(data.weather[0].icon)}{" "}
                    <p>{data.weather[0].main}</p>
                  </div>
                ) : null}
              </div>
            </div>
            {data.name !== undefined && (
              <div>
                <div className="bottom">
                  <div className="feels section-color mb-20 br-15 pd-30">
                    {data.main ? (
                      <p className="bold cl-black">
                        {convertTemperature(data.main.feels_like)}
                        {unit === "celsius" ? "°C" : "°F"}
                      </p>
                    ) : null}
                    <p className="cl-black">Feels Like</p>
                  </div>
                  <div className="humidity section-color mb-20 br-15 pd-30">
                    {data.main ? (
                      <p className="bold cl-black">{data.main.humidity}%</p>
                    ) : null}
                    <p className="cl-black">Humidity</p>
                  </div>
                  <div className="wind section-color mb-20 br-15 pd-30">
                    {data.wind ? (
                      <p className="bold cl-black">
                        {data.wind.speed.toFixed()} MPH
                      </p>
                    ) : null}
                    <p className="cl-black">Wind Speed</p>
                  </div>
                </div>
                <div className="bottom">
                  <div className="feels section-color mb-20 br-15 pd-30">
                    {data.main ? (
                      <p className="bold cl-black">
                        {convertTemperature(data.main.temp_min, unit)}
                        {unit === "celsius" ? "°C" : "°F"}
                      </p>
                    ) : null}
                    <p className="cl-black">Min Temp</p>
                  </div>
                  <div className="humidity section-color mb-20 br-15 pd-30">
                    {data.main ? (
                      <p className="bold cl-black">
                        {convertTemperature(data.main.temp_max, unit)}
                        {unit === "celsius" ? "°C" : "°F"}
                      </p>
                    ) : null}
                    <p className="cl-black">Max Temp</p>
                  </div>
                  <div className="wind section-color mb-20 br-15 pd-30">
                    {data.wind ? (
                      <p className="bold cl-black">{windDirection}</p>
                    ) : null}
                    <p className="cl-black">Wind Direction</p>
                  </div>
                </div>
              </div>
            )}
            {data.name && (
              <WeatherForecast
                city={data.name}
                unit={unit}
                convertTemperature={convertTemperature}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TempApp;
