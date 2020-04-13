import React from "react";
import { DateTime } from "luxon";

const Clock = () => {
  const dateTime = DateTime.local().setLocale("nb-NO");

  return (
    <div className="clock">
      <h1 className="time">
        {dateTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
      </h1>
      <h1 className="date">
        {dateTime.toLocaleString({
          weekday: "long",
          day: "numeric",
          month: "long"
        })}
      </h1>
    </div>
  );
};

export default Clock;
