

// ...existing code...
import ButtonAddTask from "../components/Tasks/ButtonAdd";
// Tasks Page
const TasksPage = () => {
 return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Tasks</h1>
      <ButtonAddTask />
    </div>
  );
};

export default TasksPage

