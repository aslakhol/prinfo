import React, { useState, useEffect, useContext } from "react";
import { APIControlContext } from "../APIControl";

const timeUrl = "http://worldtimeapi.org/api/timezone/Europe/Oslo";

const ApiTime = () => {
  const [time, setTime] = useState({});
  const { refresh } = useContext(APIControlContext);
  console.log("apitime rendered");

  const getTime = () => {
    fetch(timeUrl)
      .then((response) => response.json())
      .then((time) => setTime(time))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getTime();
  }, []);

  return (
    <div>
      <div className="api-time">{time.unixtime}</div>
      {/* <button onClick={() => setUpdated(updated + 1)}></button> */}
    </div>
  );
};

export default ApiTime;
