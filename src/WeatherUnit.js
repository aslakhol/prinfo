import React from "react";
import { DateTime } from "luxon";

const WeatherUnit = props => {
  if (props.weather) {
    const { symbol, precipitation, temperature, time } = props.weather;
    const iconUrl = `https://api.met.no/weatherapi/weathericon/1.1/?symbol=${symbol.number}&content_type=image/png`;
    const readableTime = DateTime.fromISO(time).toLocaleString(
      DateTime.TIME_24_SIMPLE
    );

    return (
      <div className="weather-unit">
        <h2>{readableTime} </h2>
        <span>{temperature}°C</span>
        <img src={iconUrl} alt={symbol.id} />
        <span>{precipitation}mm </span>
      </div>
    );
  } else {
    return <></>;
  }
};

export default WeatherUnit;
