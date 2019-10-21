import React from "react";
import Falaffel from "./Falaffel";
import Clock from "./Clock";
import Bikes from "./Bikes";
import Busses from "./Busses";
import Weather from "./Weather";
// import ApiTime from './ApiTime';

const App = () => {
  return (
    <div className="wrapper">
      {/* <ApiTime /> */}
      <Clock />
      <Falaffel />
      <Bikes />
      <Busses />
      <Weather />
    </div>
  );
};

export default App;
