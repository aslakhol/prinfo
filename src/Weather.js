import React, { useState, useEffect } from "react";
import convert from "xml-js";
import { DateTime } from "luxon";
import WeatherUnit from "./WeatherUnit";

const weatherUrl =
  "https://api.met.no/weatherapi/locationforecast/1.9/?lat=63.428311&lon=10.392514";

const weatherHourFormat = {
  time: undefined,
  temperature: undefined,
  symbol: { symbol: undefined, id: undefined },
  precipitation: undefined
};

const Weather = () => {
  const [weatherApiResponse, setweatherApiResponse] = useState({});
  const [weather, setWeather] = useState({
    now: weatherHourFormat,
    threeHFromNow: weatherHourFormat,
    sixHFromNow: weatherHourFormat
  });

  const getWeather = () => {
    fetch(weatherUrl)
      .then(response => response.text())
      .then(weatherXml => convert.xml2js(weatherXml, { compact: true }))
      .then(weatherJson => setweatherApiResponse(weatherJson))
      .catch(err => {
        console.error(err);
      });
  };

  const createWeatherHour = segment => {
    return {
      time: segment[0]._attributes.to,
      temperature: segment[0].location.temperature._attributes.value,
      symbol: segment[1].location.symbol._attributes,
      precipitation: segment[1].location.precipitation._attributes.value
    };
  };

  const createWeather = time => {
    const now = createWeatherHour(time.slice(0, 5));
    const threeHFromNow = createWeatherHour(time.slice(15, 20));
    const sixHFromNow = createWeatherHour(time.slice(30, 35));
    return { now, threeHFromNow, sixHFromNow };
  };

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    if (weatherApiResponse.weatherdata) {
      const time = weatherApiResponse.weatherdata.product.time;
      setWeather(createWeather(time));
    }
  }, [weatherApiResponse]);

  return (
    <div className="weather">
      <WeatherUnit class="now" weather={weather.now}></WeatherUnit>
      <WeatherUnit
        class="threeHFromNow"
        weather={weather.threeHFromNow}
      ></WeatherUnit>
      <WeatherUnit
        class="sixHFromNow"
        weather={weather.sixHFromNow}
      ></WeatherUnit>
    </div>
  );
};

export default Weather;
