import React from "react";
import Clock from "./Clock";
import ControlledBikes from "./controlled/ControlledBikes";
import ControlledBusses from "./controlled/ControlledBusses";
import ControlledWeather from "./controlled/ControlledWeather";
import ControlledDadJokes from "./controlled/ControlledDadJokes";
import APIControlContextProvider from "./APIControl";
import "./App.css";

const App = () => {
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
