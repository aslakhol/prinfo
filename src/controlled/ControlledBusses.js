import React, { useContext } from "react";
import Busses from "../Busses";
import { APIControlContext } from "../APIControl";

const ControlledBusses = () => {
  const { refresh } = useContext(APIControlContext);

  return <Busses refresh={refresh}></Busses>;
};

export default ControlledBusses;
