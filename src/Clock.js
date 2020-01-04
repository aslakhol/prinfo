import React from "react";
import { DateTime } from "luxon";

const Clock = () => {
  const dateTime = DateTime.local().setLocale("nb-NO");

  return (
    <div className="clock">
      <span className="time">
        {dateTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
      </span>
      <span className="date">
        {dateTime.toLocaleString({
          weekday: "long",
          day: "numeric",
          month: "long"
        })}
      </span>
    </div>
  );
};

export default Clock;
