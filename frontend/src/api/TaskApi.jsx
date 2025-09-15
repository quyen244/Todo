import axios from "axios";
const token = localStorage.getItem("access_token");
// Named export
export const addTask = async (taskData) => {
  try {
    const payload = {
      ...taskData , 
      completed: taskData.completed ?? false, 
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/tasks/",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding task:", error.response?.data || error.message);
    throw error;
  }
};

export const get_tasks = async () => {
  try {
    const res = await axios.get("http://localhost:8000/tasks/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.log('Lỗi lấy data', error);
    throw error;
  }
};

export const updateTask = async (task_id, updatedData) => {
  try {
    const res = await axios.put(`http://localhost:8000/tasks/${task_id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` ,
      "Content-Type": "application/json"
    }

    
    });
    return res.data;
  } catch (error) {
    console.log(updatedData)
    console.error("Error updating task:", error.response?.data || error.message);
    throw error;
  }
};


export const deleteTask = async (task_id) => {
  try {
    const res = await axios.delete(`http://localhost:8000/tasks/${task_id}`, {
      headers: { Authorization: `Bearer ${token}` ,
      "Content-Type": "application/json"}
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
    throw error;
  }
};
