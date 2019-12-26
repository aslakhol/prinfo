import React from "react";
import Falafel from "./Falafel";
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
      <Falafel />
      <Bikes />
      <Busses />
      <Weather />
    </div>
  );
};

export default App;
