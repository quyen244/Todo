import { useTasks } from "../hooks/useTasks";
import TaskItem from "../components/tmpTask/TaskItem";
import AddTask from "../components/tmpTask/AddTask";

export default function TasksPage() {
  const { tasks, loading  , createTask, editTask, removeTask} = useTasks();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-8 py-6 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Today</h1>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-6">
        15 Sep · Today · Monday
      </p>

      {/* Divider Line */}
      <hr className="my-3" />

      <ul className="space-y-2 mt-4">
        {/* If tasks exist → render them first */}
        {tasks.length > 0 ? (
          <>
            {tasks.map((t) => (
              <li key={t._id}>
                <TaskItem task={t} onEdit = {editTask} onDelete = {removeTask}/>
              </li>
            ))}
            {/* Add task always after tasks */}
            <li>
              <AddTask onAddTask={createTask}/>
            </li>
          </>
        ) : (
          <>
            {/* Add task first when no tasks */}
            <li>
              <AddTask onAddTask={createTask} />
            </li>
            {/* Empty state illustration */}
            <li>
              <div className="flex flex-col items-center justify-center text-center text-gray-500">
                <img
                  src="/img1.png"
                  alt="No tasks illustration"
                  className="w-52 h-auto opacity-90"
                />
                <p className="mt-4 text-sm">
                  No tasks match the current sorting options.
                </p>
              </div>
            </li>
          </>
        )}
    </ul>

    </div>
  );
}
