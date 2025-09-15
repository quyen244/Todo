import React, { useState } from "react";
import { FaFlag, FaClock, FaEdit, FaTrash } from "react-icons/fa";

const priorityColors = {
  1: "text-green-600 bg-green-100",
  2: "text-yellow-600 bg-yellow-100",
  3: "text-red-600 bg-red-100",
};

export default function TaskItem({ task, onEdit, onDelete }) {
  const [completed, setCompleted] = useState(task.completed);

  // Toggle completed
  const handleCheckbox = () => {
    const newStatus = !completed;
    setCompleted(newStatus);
    if (onEdit) {
      onEdit(task._id, { ...task, completed: newStatus });
    }
  };

  // Handle edit (for simplicity, prompt for new title)
  const handleEditClick = () => {
    const newTitle = prompt("Edit task title:", task.title);
    if (newTitle !== null && newTitle !== task.title) {
      onEdit(task._id, { ...task, title: newTitle });
    }
  };

  // Handle delete
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task._id);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 mb-2 rounded-lg hover:bg-gray-50 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckbox}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
        />
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>
            {task.title}
          </span>
          {task.deadline && (
            <span className="text-xs text-gray-500 flex items-center space-x-1 mt-0.5">
              <FaClock className="w-3 h-3" />
              <span>
                {new Date(task.deadline).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority === 1 ? "Low" : task.priority === 2 ? "Medium" : "High"}
        </span>
        <button onClick={handleEditClick} className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
        <button onClick={handleDeleteClick} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
