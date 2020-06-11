import React, { useContext } from "react";
import DadJokes from "./DadJokes";
import { APIControlContext } from "./APIControlContextProvider";

const ControlledDadJokes = () => {
  const { refresh } = useContext(APIControlContext);

  return <DadJokes refresh={refresh}></DadJokes>;
};

export default ControlledDadJokes;
