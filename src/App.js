import React from "react";
import OpeningHours from "./OpeningHours";
import Clock from "./Clock";
import Bikes from "./Bikes";
import Busses from "./Busses";
import Weather from "./Weather";
import DadJokes from "./DadJokes";
// import ApiTime from './ApiTime';

const App = () => {
  return (
    <div className="wrapper">
      {/* <ApiTime /> */}
      <Clock />
      <Busses />
      <Bikes />
      <Weather />
      <DadJokes />
      <OpeningHours />
    </div>
  );
};

export default App;
