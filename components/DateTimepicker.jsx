"use client";
import React, { useState } from "react";
import dayjs from "dayjs";

const DateTimePicker = ({ onFromChange, onToChange }) => {
  const [fromDateTime, setFromDateTime] = useState("");
  const [toTime, setToTime] = useState("");

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFromDateTime(value);
    onFromChange(value);
  };

  const handleToTimeChange = (e) => {
    const value = e.target.value;
    const fullDateTime = `${fromDateTime.split("T")[0]}T${value}`;
    setToTime(value);
    onToChange(fullDateTime);
  };

  return (
    <div className="flex flex-col w-full m-auto lg:w-fit max-w-[500px]">
      <div className="flex flex-col lg:flex-row gap-6 bg-white border rounded-lg p-4">
        <div className="flex flex-col gap-2 w-full">
          <p className="font-semibold">From (Date & Time)</p>
          <input
            type="datetime-local"
            className="w-full rounded-lg py-[6px] border px-2 outline-none"
            value={fromDateTime}
            onChange={handleFromChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="font-semibold">To (Time Only)</p>
          <input
            type="time"
            className={`w-full rounded-lg py-[6px] border px-2 outline-none bg-white ${
              !fromDateTime ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            value={toTime}
            onChange={handleToTimeChange}
            disabled={!fromDateTime}
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
