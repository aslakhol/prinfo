import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

import WeatherUnit from "./WeatherUnit";

const weatherUrl =
  "https://api.met.no/weatherapi/locationforecast/1.9/.json?lat=63.428311&lon=10.392514";

const weatherHourFormat = {
  time: undefined,
  temperature: undefined,
  symbol: { symbol: undefined, id: undefined },
  precipitation: undefined,
};

const Weather = () => {
  const [weatherApiResponse, setweatherApiResponse] = useState({});
  const [weather, setWeather] = useState({
    now: weatherHourFormat,
    threeHFromNow: weatherHourFormat,
    sixHFromNow: weatherHourFormat,
  });

  const getWeather = () => {
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((json) => setweatherApiResponse(json))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    const createWeatherHour = (segment) => {
      return {
        time: segment[0].to,
        temperature: segment[0].location.temperature.value,
        symbol: segment[1].location.symbol,
        precipitation: segment[1].location.precipitation.value,
      };
    };

    const createWeather = (times) => {
      const firstTime = DateTime.fromISO(times[0].to);
      const timeInThree = firstTime.plus({ hour: 3 });
      const timeInSix = firstTime.plus({ hour: 6 });

      const now = createWeatherHour(
        times
          .slice(0, 25)
          .filter((time) => DateTime.fromISO(time.to).equals(firstTime))
      );
      const threeHFromNow = createWeatherHour(
        times
          .slice(0, 25)
          .filter((time) => DateTime.fromISO(time.to).equals(timeInThree))
      );
      const sixHFromNow = createWeatherHour(
        times
          .slice(0, 25)
          .filter((time) => DateTime.fromISO(time.to).equals(timeInSix))
      );
      return { now, threeHFromNow, sixHFromNow };
    };

    if (weatherApiResponse.product) {
      const time = weatherApiResponse.product.time;
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
