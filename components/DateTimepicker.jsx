"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const DateTimePicker = ({
  onFromChange,
  onToChange,
  setIsEndBeforeBeginning,
  setIsPast,
  isPast,
  isEndBeforeBeginning,
  initialFrom = "", // For edit mode Accept initial values
  initialTo = "", // For edit mode
}) => {
  const [fromDateTime, setFromDateTime] = useState("");
  const [toTime, setToTime] = useState("");

  // Update state when initial values change(for edit mode)
  useEffect(() => {
    if (initialFrom) setFromDateTime(initialFrom);
    if (initialTo) setToTime(initialTo);
  }, [initialFrom, initialTo]);

  // The beginning of the session
  const handleFromChange = (e) => {
    const value = e.target.value;
    const fromDateTimeObj = dayjs(value); // Convert input value to dayjs object for comparison

    setFromDateTime(value);
    onFromChange(value);

    // Beggining of a session cannot be in the past
    const past = fromDateTimeObj.isBefore(dayjs.utc());
    setIsPast(past); // Lift the state to "Scheduling"

    // Revalidate end time if it's already set
    if (toTime) {
      const toDateTime = dayjs(`${value.split("T")[0]}T${toTime}`);
      setIsEndBeforeBeginning(toDateTime.isBefore(fromDateTimeObj));
    }
  };

  // The end of the session
  const handleToTimeChange = (e) => {
    const value = e.target.value;
    if (!fromDateTime) return; // Ensure fromDateTime is set

    const toDateTime = dayjs(`${fromDateTime.split("T")[0]}T${value}`); // Cover to dayjs for comparison
    const fromDateTimeObj = dayjs(fromDateTime);

    // End of a session cannot be before the beginning
    const beforeStart = toDateTime.isBefore(fromDateTimeObj);
    setIsEndBeforeBeginning(beforeStart); // Lift state to "Scheduling"

    setToTime(value);
    onToChange(toDateTime.format());
  };

  return (
    <div className="flex flex-col w-full m-auto lg:w-fit max-w-[500px]">
      <div className="flex flex-col lg:flex-row gap-6 bg-white border rounded-lg p-4">
        {/* Beginning of session */}
        <div className="flex flex-col gap-2 w-full">
          <p className="font-semibold">From (Date & Time)</p>
          {isPast && (
            <p className="text-red-500 text-sm">
              Cannot schedule session in the past.
            </p>
          )}
          <input
            type="datetime-local"
            className="w-full rounded-lg py-[6px] border px-2 outline-none"
            value={fromDateTime}
            min={new Date().toISOString().slice(0, 16)} // Restrict past selection
            onChange={handleFromChange}
          />
        </div>

        {/* End of session input */}
        <div className="flex flex-col gap-2 w-full">
          <p className="font-semibold">To (Time Only)</p>
          {isEndBeforeBeginning && (
            <p className="text-red-500 text-sm">
              Session cannot end before it start.
            </p>
          )}
          <input
            type="time"
            className={`w-full rounded-lg py-[6px] border px-2 outline-none bg-white ${
              !fromDateTime || isPast ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            value={toTime}
            onChange={handleToTimeChange}
            disabled={isPast || !fromDateTime}
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
