import React, { useState, useEffect } from "react";
import Script from "react-load-script";
import { DateTime } from "luxon";

// const denGodeNaboId = "ChIJnSfpw5kxbUYRrD-oYXLVPTI";
const name = "Extra";
const placeId = "ChIJj_IGzpoxbUYR7VCF93NHcjU";
const mapsApiKey = "AIzaSyCGXAYCU315Z115dqgXmSA5k0Uy5nOHesY";
const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places&language=nb-NO`;

const OpeningHours = () => {
  const [hours, setHours] = useState({ weekday_text: [] });
  const [open, setOpen] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const dateTime = DateTime.local();

  const getHours = () => {
    const request = {
      placeId: placeId,
      fields: ["opening_hours", "utc_offset_minutes"]
    };

    /*global google*/
    const service = new google.maps.places.PlacesService(
      document.getElementById("attrs")
    );

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setHours(place.opening_hours);
        setOpen(place.opening_hours.isOpen());
      } else {
        console.error(status);
      }
    });
  };

  useEffect(() => {
    if (apiLoaded) {
      getHours();
    }
  }, [apiLoaded]);

  return (
    <div className="wrapper">
      <Script
        onLoad={() => setApiLoaded(true)}
        onError={() => setApiLoaded(false)}
        url={apiUrl}
      />
      <p>{hours ? `${name} er åpent!` : `${name} er stengt :(`}</p>
      <p style={{ textTransform: "capitalize" }}>
        {hours.weekday_text[dateTime.weekday - 1]}
      </p>
      <div id="attrs"></div>
    </div>
  );
};

export default OpeningHours;
