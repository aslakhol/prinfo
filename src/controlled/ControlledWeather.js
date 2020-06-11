import React, { useContext } from "react";
import Weather from "../Weather";
import { APIControlContext } from "../APIControl";

const ControlledWeather = () => {
  const { refresh } = useContext(APIControlContext);

  return <Weather refresh={refresh}></Weather>;
};

export default ControlledWeather;
