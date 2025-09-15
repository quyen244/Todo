import React, { useState } from "react";

export default function TimeForm({ onClose, onSelect }) {
  const [timeValue, setTimeValue] = useState("");

  const handleUpdate = () => {
    if (onSelect) {
      onSelect(timeValue); // chỉ gửi khi nhấn Update
    }
    onClose();
  };

  return (
    <div className="p-3 bg-white">
      {/* Input for selecting time */}
      <label
        htmlFor="timeInput"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Time:
      </label>
      <input
        id="timeInput"
        type="time"
        value={timeValue}
        onChange={(e) => setTimeValue(e.target.value)}
        className="border rounded-md px-2 py-1 text-sm w-full mb-6"
      />

      {/* Divider */}
      <hr className="my-2" />

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleUpdate}
          disabled={!timeValue}
          className={`px-3 py-1 text-sm rounded-md text-white ${
            timeValue
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Update
        </button>
      </div>
    </div>
  );
}
