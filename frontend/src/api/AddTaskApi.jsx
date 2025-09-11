import axios from "axios";

export const addTask = async (taskData) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/tasks/", taskData);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }       
};

