import React, { useState, useEffect } from 'react';
import EnturService from '@entur/sdk';

const service = new EnturService({ clientName: 'hollund-prinfo' })

const Busses = () => {
  const [busStop, setBusStop] = useState([])
  const [fromCenterStop, setFromCenterStop] = useState([])
  const [toCenterStop, setToCenterStop] = useState([])

  const id = 'NSR:StopPlace:41613';

  const fromCenter = 'NSR:Quay:71184';
  const toCenter = 'NSR:Quay:71181';

  const size = 6;

  useEffect(() => {
    service.getStopPlaceDepartures(id)
      .then(data => setBusStop(data))
  }, [])

  useEffect(() => {
    const fromCenterData = busStop.filter(d => d.quay.id === fromCenter);
    console.log(fromCenterData)
  }, [busStop])
  return (
    <>
      <br />
      {busStop.slice(0, size).map(departure => (
        <Departure key={departure.serviceJourney.id} departure={departure} />
      ))}
      {/* {console.log(busStop.slice(0, size))} */}
      {console.log(toCenterStop)}
    </>
  )
};

const Departure = (props) => {
  const { departure } = props;
  const { destinationDisplay } = departure;
  console.log(departure)
  // console.log(destinationDisplay)

  return (
    <div className="departure">
      {destinationDisplay.frontText}, {departure.quay.publicCode}
    </div>
  )
}

export default Busses;
