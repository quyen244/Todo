import React, { useState, useRef, useEffect } from 'react';
import { FaFlag } from 'react-icons/fa';
import DateSelection from './DateSelection';

export default function TaskForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: false,
    reminders: false,
    repeat: false
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null); // Ref cho datepicker

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

    // Click ngoài datepicker sẽ đóng nó
    useEffect(() => {
      function handleClickOutside(event) {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
          setShowDatePicker(false);
        }
      }
  
      if (showDatePicker) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDatePicker]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20">
      <div className="h-[14rem] bg-white rounded-lg shadow-xl w-[36rem] relative -mt-100">
        {/* Header */}
        <div className="p-4 border-b">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Schedule review"
            className="w-full text-lg font-medium border-none outline-none placeholder-gray-400"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full text-sm text-gray-600 border-none outline-none mt-2 placeholder-gray-400"
          />
        </div>

        {/* Date Picker */}
        <div
          className={`absolute top-40 left-5 w-full z-50 mt-1 transition-all duration-200 ${
            showDatePicker ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
        {showDatePicker && (
          <div
            ref={datePickerRef}  // <-- đây chính là dòng giúp React "biết" datepicker
          >
            <DateSelection
              selectedDate={formData.deadline}
              onSelectDate={(date) => {
                setFormData(prev => ({ ...prev, deadline: date }));
                setShowDatePicker(false);
              }}
            />
          </div>
        )}
        </div>

        {/* Tags */}
        <div className="p-4 border-b">
          <div className="flex gap-2 flex-wrap">
            <button
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full relative z-10"
              onClick={() => setShowDatePicker(prev => !prev)}
            >
              {formData.deadline ? new Date(formData.deadline).toDateString() : 'Today'}
            </button>

            <button className="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 text-gray-600 text-sm rounded-full hover:bg-gray-50">
              <FaFlag className="w-3 h-3" />
              Priority
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Add task
          </button>
        </div>
      </div>
    </div>
  );
}
