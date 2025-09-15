import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaCalendarAlt, FaFlag, FaClock } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import DatePicker from "./DateTimePicker";
import PriorityMenu from "./PriorityMenu";
import RemindersMenu from "./ReminderMenu";
import { addTask } from "../../api/TaskApi";

import { useAuth } from "../AuthProvider";

export default function TaskForm({ onClose , onAddTask}) {
    const { accessToken } = useAuth(); 
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      deadline: new Date(),
      priority: null,
      reminder_before: null,
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showRemindersMenu, setShowRemindersMenu] = useState(false);

  const watchPriority = watch("priority");
  const watchDeadline = watch("deadline");
  const watchReminder = watch("reminder_before");

  const priorityText = { 1: "Low", 2: "Medium", 3: "High" };


    const onSubmit = async (data) => {
    try {
        onAddTask(data)
        onClose();
    } catch (err) {
        console.error(err);
    }
    };

  return (
    <div className="relative max-w-xxl mx-auto my-6 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
        {/* Title */}
        <input
          {...register("title", { required: true })}
          placeholder="Practice math problems daily at 4pm"
          className="text-sm text-gray-800 placeholder-gray-400 focus:outline-none border-b border-gray-200 pb-1"
        />

        {/* Description */}
        <input
          {...register("description")}
          placeholder="Description"
          className="text-sm text-gray-500 mt-1 focus:outline-none"
        />

        {/* Actions */}
        <div className="flex items-center space-x-2 mt-3 relative">
          {/* Date Picker */}
          <button
            type="button"
            onClick={() => setShowDatePicker(true)}
            className="flex items-center space-x-2 border border-gray-200 rounded px-3 py-0.5 text-sm text-green-600 bg-green-50 hover:bg-green-100"
          >
            <FaCalendarAlt className="text-sm" />
            <span>
              {watchDeadline
                ? new Date(watchDeadline).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                : "Today"}
            </span>
            {watchDeadline && (
              <span
                className="ml-1 text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("deadline", null);
                }}
              >
                &times;
              </span>
            )}
          </button>

          {/* Priority */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPriorityMenu(true)}
              className="flex items-center space-x-2 border border-gray-200 rounded px-3 py-0.5 text-sm text-gray-600 hover:bg-gray-100"
            >
              <FaFlag className="text-sm" />
              <span>{watchPriority ? priorityText[watchPriority] : "Priority"}</span>
            </button>
            {showPriorityMenu && (
              <PriorityMenu
                selectedPriority={watchPriority}
                onSelect={(priority) => {
                  setValue("priority", priority);
                  setShowPriorityMenu(false);
                }}
                onClose={() => setShowPriorityMenu(false)}
              />
            )}
          </div>

          {/* Reminder */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRemindersMenu(true)}
              className="flex items-center space-x-2 border border-gray-200 rounded px-3 py-0.5 text-sm text-gray-600 hover:bg-gray-100"
            >
              <FaClock className="text-sm" />
              <span>
                {watchReminder !== null ? `Reminder: ${watchReminder} min` : "Reminders"}
              </span>
            </button>
          </div>

          {showRemindersMenu && (
              <RemindersMenu
                hasDateTimeSet={!!watchDeadline}
                onSelect={(reminder) => {
                  setValue("reminder_before", reminder);
                  setShowRemindersMenu(false);
                }}
                onClose={() => setShowRemindersMenu(false)}
              />
            )}

          {/* More Actions */}
          <button type="button" className="border border-gray-200 rounded p-1 text-sm text-gray-600 hover:bg-gray-100">
            <BsThreeDots />
          </button>

          {/* DatePicker Component */}
          {showDatePicker && (
            <DatePicker
              initialDate={watchDeadline}
              onSelect={(date) => {
                setValue("deadline", date);
                setShowDatePicker(false);
              }}
              onClose={() => setShowDatePicker(false)}
            />
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-2 px-2 py-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!(watchPriority && watchDeadline && watchReminder)}
            className={`px-3 py-1 text-sm rounded-md ${
              watchPriority && watchDeadline && watchReminder
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add task
          </button>
        </div>
      </form>
    </div>
  );
}
