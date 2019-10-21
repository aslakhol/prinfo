import React, { useState, useEffect } from "react";
import convert from "xml-js";
import { DateTime } from "luxon";

const weatherUrl =
  "https://api.met.no/weatherapi/locationforecast/1.9/?lat=63.428311&lon=10.392514";

const weatherHourFormat = {
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
    console.log("createWeatherHour");
    printReadableDate(segment[0]._attributes.to);
    printReadableDate(segment[0]._attributes.from);

    const weather = {
      temperature: segment[0].location.temperature._attributes.value,
      symbol: segment[1].location.symbol._attributes,
      precipitation: segment[1].location.precipitation._attributes.value
    };
    return weather;
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
      time.slice(0, 5).map(timeInstance => console.log(timeInstance));
      setWeather(createWeather(time));
    }
  }, [weatherApiResponse]);
  return <div className="weather">Symbol: {weather.now.symbol.id}</div>;
};

export default Weather;

const printReadableDate = timeStr => {
  return console.log(
    DateTime.fromISO(timeStr).toLocaleString(DateTime.TIME_24_SIMPLE)
  );
};

const printToFromTime = timeInstance => {
  const from = DateTime.fromISO(timeInstance._attributes.from);
  const to = DateTime.fromISO(timeInstance._attributes.to);
  console.log(
    from.toLocaleString(DateTime.DATE_SHORT),
    from.toLocaleString(DateTime.TIME_24_SIMPLE),
    "-",
    to.toLocaleString(DateTime.TIME_24_SIMPLE)
  );
};
