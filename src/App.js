import React from 'react';
import Falaffel from './Falaffel';
import Clock from './Clock';
import Bikes from './Bikes';
import Busses from './Busses'
// import ApiTime from './ApiTime';

const App = () => {
  return (
    <div className="wrapper">
      {/* <ApiTime /> */}
      <Clock />
      <Falaffel />
      <Bikes />
      <Busses />
    </div>
  )
}

export default App;
