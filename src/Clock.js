import React from "react";
import { DateTime } from "luxon";

const Clock = () => {
  const dateTime = DateTime.local().setLocale("nb-NO");

  return (
    <>
      <span>{dateTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
      <br />
      <span>
        {dateTime.toLocaleString({
          weekday: "long",
          day: "numeric",
          month: "long"
        })}
      </span>
    </>
  );
};

export default Clock;
