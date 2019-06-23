import React, { useState, useEffect } from 'react';
import Falaffel from './Falaffel';
import Clock from './Clock';

const timeUrl = 'http://worldtimeapi.org/api/timezone/Europe/Oslo';

const App = () => {
  const [time, setTime] = useState({});

  const getTime = () => {
    fetch(timeUrl)
      .then(response => response.json())
      .then(time => setTime(time))
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    getTime();
  }, [])

  return (
    <div className="wrapper">
      {/* {time.unixtime} */}
      <Clock />
      <Falaffel />
    </div>
  )
}

export default App;
