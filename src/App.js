import React from 'react';
import Falaffel from './Falaffel';
import Clock from './Clock';
import Bikes from './Bikes';
// import ApiTime from './ApiTime';

const App = () => {
  return (
    <div className="wrapper">
      {/* <ApiTime /> */}
      <Clock />
      <Falaffel />
      <Bikes />
    </div>
  )
}

export default App;
