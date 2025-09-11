// ButtonAdd Component
import { useState } from "react"
import TaskForm from "./FormTask";

export default function ButtonAddTask() {
    // State to manage form visibility
    const [isFormVisible, setFormVisible] = useState(false);
  
    return (
        <div>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"  
                onClick={() => setFormVisible(true)}
            >
                <span className="mr-2">Add Task</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </button>
            
            {/* Modal/Overlay for the form */}
            {isFormVisible && ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-white via-slate-50 to-white shadow-2xl rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-200">
                <TaskForm onClose={() => setFormVisible(false)} />
            </div>
        </div>)}
       


        </div>
    )
}