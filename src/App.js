import React, { useState, useEffect } from "react";
import OpeningHours from "./OpeningHours";
import Clock from "./Clock";
import Bikes from "./Bikes";
import Busses from "./Busses";
import Weather from "./Weather";
import DadJokes from "./DadJokes";
// import ApiTime from './ApiTime';
import "./App.css";

const App = () => {
  const [updated, setUpdated] = useState(1);
  const APIRefreshDelay = 30000;

  const refreshAPIData = () => {
    console.log("APIs refreshed");

    setUpdated((prevUpdated) => prevUpdated * -1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("triggered");
      refreshAPIData();
    }, APIRefreshDelay);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wrapper">
      {/* <ApiTime /> */}
      <Clock />
      <Busses />
      <Bikes />
      <Weather />
      <OpeningHours />
      <DadJokes />
    </div>
  );
};

export default App;
