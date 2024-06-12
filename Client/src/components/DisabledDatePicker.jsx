import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DisabledDatePicker = ({ dateRanges, onChange, selected }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDateDisabled = (date) => {
    if (date < today) {
      return true;
    }
    return dateRanges.some((range) => {
      const start = new Date(range.startDate);
      const end = new Date(range.endDate);
      return date >= start && date <= end;
    });
  };

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      filterDate={(date) => !isDateDisabled(date)}
      placeholderText="Select a date"
    />
  );
};

export default DisabledDatePicker;
