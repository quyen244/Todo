// hooks/useTasks.js
import { useEffect, useState } from "react";
import { get_tasks, addTask, updateTask, deleteTask } from "../api/TaskApi";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await get_tasks();
      setTasks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData);
      setTasks(prev => [...prev, newTask]); 
    } catch (e) {
      console.error(e);
    }
  };
  
  const editTask = async (id, updatedData) => {
    try {
      const updatedTask = await updateTask(id, updatedData);
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task));
    } catch (e) {
      console.error(e);
    }
  };
  
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (e) {
      console.error(e);
    }
  };
  

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, fetchTasks, createTask, editTask, removeTask };
};
