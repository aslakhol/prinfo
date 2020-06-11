import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import Bikes from "./Bikes";
import Busses from "./Busses";
import Weather from "./Weather";
// import OpeningHours from "./OpeningHours";
// import ApiTime from "./ApiTime";
import "./App.css";
import APIControlContextProvider from "./APIControl";
import ControlledDadJokes from "./ControlledDadJokes";

const App = () => {
  const [updated, setUpdated] = useState(1);
  const APIRefreshDelay = 30000;

  return (
    <APIControlContextProvider>
      <div className="wrapper">
        {/* <ApiTime /> */}
        <Clock />
        <Busses />
        <Bikes />
        <Weather />
        {/* <OpeningHours /> */}
        <ControlledDadJokes />
      </div>
    </APIControlContextProvider>
  );
};

export default App;
