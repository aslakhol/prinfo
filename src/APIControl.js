import React, { useState, useEffect } from "react";

export const APIRefreshDelay = 3000;

export const APIControlContext = React.createContext(1);

const APIControlContextProvider = (props) => {
  const [refresh, setRefresh] = useState(1);

  const refreshAPIData = () => {
    console.log("refresh data called");

    setRefresh((prevRefresh) => prevRefresh * -1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAPIData();
    }, APIRefreshDelay);

    return () => clearInterval(interval);
  }, []);

  return (
    <APIControlContext.Provider value={{ refresh }}>
      {props.children}
    </APIControlContext.Provider>
  );
};

export default APIControlContextProvider;
