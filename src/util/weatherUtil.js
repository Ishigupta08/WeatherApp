import { WEATHER_ICONS } from "../constants/weatherIcon";

export const getWeatherIcon = (iconCode) => {
  return WEATHER_ICONS[iconCode] || WEATHER_ICONS.default;
};

export const calculateWindDirection = (degree) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const index = Math.round(degree / 22.5);
  return directions[index % 16];
};
export const convertTemperature = (temp, unit) => {
  if (unit === "celsius") {
    return Math.round(temp - 273.15);
  }
  return Math.round((temp - 273.15) * 1.8 + 32);
};