import React, { useState, useEffect } from "react";
import Script from "react-load-script";
import { DateTime } from "luxon";

const falafelPlaceId = "ChIJUyxTzZoxbUYRZW_wwSUIUFk";
const nimuserPlaceId = "ChIJ4WP3fpAxbUYR0lXPGkizoww";
const mapsApiKey = "AIzaSyCGXAYCU315Z115dqgXmSA5k0Uy5nOHesY";
const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places&language=nb-NO`;

const OpeningHours = () => {
  const [falafelHours, setfalafelHours] = useState({ weekday_text: [] });
  const [falfafelOpen, setFalafelOpen] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const dateTime = DateTime.local();

  const getFalaffelHours = () => {
    const request = {
      placeId: nimuserPlaceId, // falafelplace is broken for now, using this as replacement
      fields: ["opening_hours", "utc_offset_minutes"]
    };

    /*global google*/
    const service = new google.maps.places.PlacesService(
      document.getElementById("attrs")
    );

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setfalafelHours(place.opening_hours);
        setFalafelOpen(place.opening_hours.isOpen());
      } else {
        console.error(status);
      }
    });
  };

  useEffect(() => {
    if (apiLoaded) {
      getFalaffelHours();
    }
  }, [apiLoaded]);

  return (
    <div className="wrapper">
      <Script
        onLoad={() => setApiLoaded(true)}
        onError={() => setApiLoaded(false)}
        url={apiUrl}
      />
      <h1>Falaffel</h1>
      <p>
        {falfafelOpen
          ? "Falafelkompaniet er åpent!"
          : "Falafelkompaniet er stengt :("}
      </p>
      <p style={{ textTransform: "capitalize" }}>
        {falafelHours.weekday_text[dateTime.weekday - 1]}
      </p>
      <div id="attrs"></div>
    </div>
  );
};

export default OpeningHours;
