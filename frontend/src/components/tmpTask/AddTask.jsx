import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import TaskForm from './TaskForm';

function AddTask({ onAddTask }) {
  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <div>
      <button
        className="w-full flex items-center gap-3 text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
        onClick={() => setFormVisible(true)}
      >
        <FaPlus className="w-4 h-4" />
        <span className="font-medium">Add task</span>
      </button>

      {isFormVisible && (
        <TaskForm
          onClose={() => setFormVisible(false)}
          onAddTask={(taskData) => {
            if (onAddTask) onAddTask(taskData);  
            setFormVisible(false);              
          }}
        />
      )}
    </div>
  );
}

export default AddTask;
