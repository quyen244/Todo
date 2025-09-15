import React, { useState, useRef, useEffect } from "react";
import { FaInfoCircle, FaQuestionCircle } from "react-icons/fa";

const reminderOptions = [
  { value: 5, label: "5 minutes before" },
  { value: 10, label: "10 minutes before" },
  { value: 15, label: "15 minutes before" },
  { value: 30, label: "30 minutes before" },
  { value: 0, label: "At time of task" },
];

function RemindersMenu({ hasDateTimeSet, onSelect, onClose }) {
  const reminderRef = useRef(null);
  const [selectedReminder, setSelectedReminder] = useState(10); // default 10 min

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (reminderRef.current && !reminderRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAddClick = () => {
    if (onSelect) onSelect(selectedReminder);
    if (onClose) onClose();
  };

  return (
    <div
      ref={reminderRef}
      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 space-y-4 z-50"
      style={{ marginLeft: "1.5rem" }} // dịch qua phải một chút
    >
      {/* Header */}
      <h3 className="font-semibold text-gray-800">Reminders</h3>

      {/* Tabs */}
      <div className="bg-gray-100 rounded-full p-1 text-center text-sm">
        <button className="font-semibold text-gray-800 px-4 py-1 rounded-full bg-white shadow-sm">
          Before task
        </button>
      </div>

      {/* Content */}
      {!hasDateTimeSet ? (
        <div className="flex items-center space-x-2 text-sm text-gray-500 p-2">
          <FaInfoCircle />
          <span>Add a date and time to the task first.</span>
        </div>
      ) : (
        <div className="space-y-1">
          {reminderOptions.map((option) => (
            <button
            type="button"  
              key={option.value}
              onClick={() => setSelectedReminder(option.value)}
              className={`w-full text-left text-sm p-2 rounded-md transition ${
                selectedReminder === option.value
                  ? "bg-red-100 text-red-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t">
        <button className="text-gray-400 hover:text-gray-600">
          <FaQuestionCircle size={20} />
        </button>
        <button
          type="button"  
          onClick={handleAddClick}
          disabled={!hasDateTimeSet}
          className={`px-4 py-2 text-sm font-semibold text-white rounded-md ${
            !hasDateTimeSet
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Add reminder
        </button>
      </div>
    </div>
  );
}

export default RemindersMenu;
