import React, { useContext } from "react";
import Bikes from "../Bikes";
import { APIControlContext } from "../APIControl";

const ControlledBikes = () => {
  const { refresh } = useContext(APIControlContext);

  return <Bikes refresh={refresh}></Bikes>;
};

export default ControlledBikes;
