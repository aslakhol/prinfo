import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import ControlledBikes from "./controlled/ControlledBikes";
import ControlledBusses from "./controlled/ControlledBusses";
import ControlledWeather from "./controlled/ControlledWeather";
import "./App.css";
import APIControlContextProvider from "./APIControl";
import ControlledDadJokes from "./controlled/ControlledDadJokes";

const App = () => {
  const [updated, setUpdated] = useState(1);
  const APIRefreshDelay = 30000;

  return (
    <APIControlContextProvider>
      <div className="wrapper">
        <Clock />
        <ControlledBusses />
        <ControlledBikes />
        <ControlledWeather />
        <ControlledDadJokes />
      </div>
    </APIControlContextProvider>
  );
};

export default App;
