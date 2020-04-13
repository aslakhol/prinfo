import React, { useState, useEffect } from "react";
import EnturService from "@entur/sdk";
import { DateTime } from "luxon";

const service = new EnturService({ clientName: "hollund-prinfo" });

const Busses = () => {
  const [departures, setDepartures] = useState([]);
  const [departuresFromCenter, setDeparturesFromCenter] = useState([]);
  const [departuresToCenter, setDeparturesToCenter] = useState([]);

  const id = "NSR:StopPlace:41613";

  const fromCenter = "NSR:Quay:71184";
  const toCenter = "NSR:Quay:71181";

  const size = 6;

  useEffect(() => {
    service.getStopPlaceDepartures(id).then(data => setDepartures(data));
  }, []);

  useEffect(() => {
    setDeparturesFromCenter(departures.filter(d => d.quay.id === fromCenter));
    setDeparturesToCenter(departures.filter(d => d.quay.id === toCenter));
  }, [departures]);

  return (
    <div className="busses">
      <div className="from">
        <h2>Fra Sentrum</h2>
        {departuresFromCenter.slice(0, size).map(departure => (
          <Departure key={departure.serviceJourney.id} departure={departure} />
        ))}
      </div>
      <div className="towards">
        <h2>Mot Sentrum</h2>
        {departuresToCenter.slice(0, size).map(departure => (
          <Departure key={departure.serviceJourney.id} departure={departure} />
        ))}
      </div>
    </div>
  );
};

const Departure = props => {
  const { departure } = props;
  const { expectedDepartureTime, serviceJourney } = departure;
  const departureTime = DateTime.fromISO(expectedDepartureTime);
  const timeTilDeparture = calculateTimeTilDeparture(departureTime);
  return (
    <div className="departure">
      # {serviceJourney.journeyPattern.line.publicCode} - {timeTilDeparture}
    </div>
  );
};

const calculateTimeTilDeparture = departureTime => {
  const now = DateTime.local();
  const diff = departureTime.diff(now, "minutes");
  const minuteFloat = diff.toObject().minutes;
  const flooredMinute = Math.floor(minuteFloat);
  const semanticTimeToDeparture =
    flooredMinute === 0 ? "Nå" : flooredMinute + " min";
  return semanticTimeToDeparture;
};

export default Busses;
