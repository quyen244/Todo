import React, { useState } from 'react';
import { FaClock, FaRedo } from 'react-icons/fa';

export default function DateSelection({ selectedDate, onSelectDate }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const quickDateOptions = [
    { label: 'Tomorrow', value: new Date(today.getTime() + 86400000) }, // +1 day
    { label: 'Next weekend', value: getNextWeekend() },
    { label: 'No Date', value: '' }
  ];

  function getNextWeekend() {
    const d = new Date(today);
    const day = d.getDay();
    const diff = 6 - day; // Saturday
    d.setDate(d.getDate() + diff);
    return d;
  }

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} />);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate && new Date(selectedDate).toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => onSelectDate(date)}
          className={`w-7 h-7 flex items-center justify-center text-xs cursor-pointer rounded-full hover:bg-gray-200 ${
            isSelected ? 'bg-red-500 text-white' : 'text-gray-700'
          }`}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className=" text-0.5xl left-0 mt-1 w-58 bg-white border border-gray-200 rounded-lg shadow-lg realtive z-50">
      {/* Quick Options */}
      <div className="space-y-2 mb-4">
        {quickDateOptions.map(option => (
          <div
            key={option.label}
            onClick={() => onSelectDate(option.value)}
            className="flex justify-between py-2 px-3 hover:bg-gray-50 rounded-md cursor-pointer"
          >
            <span>{option.label}</span>
            <span>{option.value instanceof Date ? option.value.toDateString() : ''}</span>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-200 rounded">{'<'}</button>
          <span className="font-medium">{monthNames[currentMonth]} {currentYear}</span>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-200 rounded">{'>'}</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-medium text-gray-500">
          {['M','T','W','T','F','S','S'].map(d => <div key={d} className="flex items-center justify-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>
      </div>

      {/* Time & Repeat */}
      <div className="space-y-2">
        <button className="w-full flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <FaClock className="w-4 h-4 text-gray-400" /> Time
        </button>
        <button className="w-full flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <FaRedo className="w-4 h-4 text-gray-400" /> Repeat
        </button>
      </div>
    </div>
  );
}
