import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddTask = ({ onAdd }) => {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    const title = newTask.trim();
    if (!title) return; // Không thêm nếu rỗng

    // Gọi callback từ cha truyền xuống để thêm task mới
    onAdd({
      id,
      title,
      completed: false,
      priority: "medium",
      deadline: new Date().toISOString().split("T")[0],
    });

    setNewTask(""); // Reset input
  };

  // Thêm task khi nhấn Enter
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={onKeyPress}
        className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AddTask;
