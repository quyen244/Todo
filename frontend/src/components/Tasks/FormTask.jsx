import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, AlertCircle, Repeat, Bell } from 'lucide-react';
import { addTask } from '../../api/AddTaskApi';

const TaskForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    description: '',
    completed: false,
    priority: 'medium',
    deadline: '',
    reminder: '',
    repeat: 'none',
    reminder_before: ''
  });

  const [errors, setErrors] = useState({});

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600 bg-green-50' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
    { value: 'high', label: 'High', color: 'text-red-600 bg-red-50' }
  ];

  const repeatOptions = [
    { value: 'none', label: 'No Repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const reminderBeforeOptions = [
    { value: '5', label: '5 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '1440', label: '1 day' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.deadline && formData.reminder) {
      const deadlineDate = new Date(formData.deadline);
      const reminderDate = new Date(formData.reminder);
      if (reminderDate > deadlineDate) {
        newErrors.reminder = 'Reminder cannot be after deadline';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Prepare data for MongoDB
    const taskData = {
        ...formData,
        user_id: "demo_user_123",
        reminder_before: formData.reminder_before
            ? parseInt(formData.reminder_before)
            : null,
        deadline: null,
        reminder: null
    };
 console.log('Task data to be sent to MongoDB:', taskData);

    addTask(taskData);

    console.log('Task data to be sent to MongoDB:', taskData);

    // Close the form after submission
    onClose();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Task</h2>
        <p className="text-gray-600">Fill in the details below to add a new task to your list.</p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 mr-2" />
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter task title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 mr-2" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description (optional)"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <AlertCircle className="w-4 h-4 mr-2" />
            Priority
          </label>
          <div className="grid grid-cols-3 gap-3">
            {priorityOptions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={formData.priority === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-3 text-center rounded-md border-2 transition-all ${
                  formData.priority === option.value
                    ? `${option.color} border-current`
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}>
                  {option.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            Deadline
          </label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Reminder */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Bell className="w-4 h-4 mr-2" />
            Reminder
          </label>
          <input
            type="datetime-local"
            name="reminder"
            value={formData.reminder}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.reminder ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.reminder && <p className="mt-1 text-sm text-red-600">{errors.reminder}</p>}
        </div>

        {/* Reminder Before */}
        {formData.deadline && (
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              Reminder Before Deadline
            </label>
            <select
              name="reminder_before"
              value={formData.reminder_before}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.reminder_before ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select reminder time</option>
              {reminderBeforeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.reminder_before && <p className="mt-1 text-sm text-red-600">{errors.reminder_before}</p>}
          </div>
        )}

        {/* Repeat */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Repeat className="w-4 h-4 mr-2" />
            Repeat
          </label>
          <select
            name="repeat"
            value={formData.repeat}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {repeatOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-6 flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Create Task
          </button>
        
            <button
              onClick={onClose}
              className="px-6 bg-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"> 
              Cancel
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default TaskForm;