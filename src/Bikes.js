import React, { useState, useEffect } from "react";
import EnturService from "@entur/sdk";

const service = new EnturService({ clientName: "hollund-prinfo" });

const BikeStations = () => {
  const [bikeStations, setBikeStations] = useState([]);

  useEffect(() => {
    service
      .getBikeRentalStations({ latitude: 63.428311, longitude: 10.392514 }, 230)
      .then(data => setBikeStations(data));
  }, []);

  return (
    <div className="bikes">
      <h2>Bysykkel</h2>
      {bikeStations.map(station => (
        <Station key={station.id} station={station} />
      ))}
    </div>
  );
};

const Station = props => {
  const { station } = props;
  return (
    <div className="station">
      {station.name} - {station.bikesAvailable} : {station.spacesAvailable}
    </div>
  );
};

export default BikeStations;
