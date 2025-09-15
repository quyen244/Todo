import React, { useEffect, useRef, useState } from "react";
import TimeForm from "./TimeForm";

export default function DateTimePicker({ onSelect, onClose }) {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState(now); 
  const [showTimeForm, setShowTimeForm] = useState(false);
  const pickerRef = useRef(null);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day, selectedDate.getHours(), selectedDate.getMinutes());
    if (date < today) return; 
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const updated = new Date(selectedDate);
    updated.setHours(hour, minute);
    setSelectedDate(updated);
    setShowTimeForm(false);
  };

  const handleApply = () => {
    onSelect(selectedDate);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={pickerRef}
      className="absolute mt-2 p-4 bg-white rounded-md shadow-lg border border-gray-200 z-50 w-72"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </h3>
        <div>
          <button
            className="px-2 text-gray-500"
            onClick={() =>
              setCurrentMonth((prev) =>
                prev === 0 ? (setCurrentYear((y) => y - 1), 11) : prev - 1
              )
            }
          >
            &lt;
          </button>
          <button
            className="px-2 text-gray-500"
            onClick={() =>
              setCurrentMonth((prev) =>
                prev === 11 ? (setCurrentYear((y) => y + 1), 0) : prev + 1
              )
            }
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-500">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center text-sm mt-2">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateObj = new Date(currentYear, currentMonth, day);
          const dateKey = dateObj.toDateString();
          const todayKey = new Date().toDateString();
          const isPast = dateObj < today;
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedDate.toDateString();

          return (
            <div
              key={day}
              onClick={() => !isPast && handleDateClick(day)}
              className={`p-1 cursor-pointer rounded-full transition
                ${isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-red-100"}
                ${isToday && !isSelected ? "border border-red-400" : ""}
                ${isSelected ? "bg-red-500 text-white" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Time Picker */}
      <div className="mt-4 relative">
        <button
          type="button"
          className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
          onClick={() => setShowTimeForm((prev) => !prev)}
        >
          {selectedDate.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </button>

        {showTimeForm && (
          <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-md shadow-lg border border-gray-200">
            <TimeForm onClose={() => setShowTimeForm(false)} onSelect={handleTimeSelect} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-3 py-1 text-sm text-white rounded-md bg-red-500 hover:bg-red-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
