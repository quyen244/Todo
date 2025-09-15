import React, { useEffect, useRef } from "react";
import { FaFlag, FaCheck } from "react-icons/fa";

const priorities = [
  { level: 1, text: "Low", color: "text-red-500" },
  { level: 2, text: "Medium", color: "text-orange-500" },
  { level: 3, text: "High", color: "text-blue-500" },
];

function PriorityMenu({ selectedPriority, onSelect, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute z-10 mt-5 w-32 bg-white rounded-md shadow-lg border border-gray-200"
    >
      <ul className="py-1">
        {priorities.map((priority) => (
          <li key={priority.level}>
            <button
              onClick={() => onSelect(priority.level)}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <FaFlag className={`mr-3 ${priority.color}`} />
                <span>{priority.text}</span>
              </div>
              {selectedPriority === priority.level && (
                <FaCheck className="text-red-500" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriorityMenu;
