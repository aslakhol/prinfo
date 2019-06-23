import React, { useState, useEffect } from 'react';

const timeUrl = 'http://worldtimeapi.org/api/timezone/Europe/Oslo';

const ApiTime = () => {
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

  return <div className="api-time">{time.unixtime}</div>
}

export default ApiTime;
