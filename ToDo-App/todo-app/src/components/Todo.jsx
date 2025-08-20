import React from "react";
import "../App.css";
import { Check } from "lucide-react";

function Todo() {
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please enter a task");
      return;
    }
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false }, // added id
    ]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className=" flex  justify-center ">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600 underline">
         To-Do List
        </h1>

        {/* Input section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            placeholder="Add a task..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded shadow"
          >
            Add
          </button>
        </div>

      
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">📝</div>
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border shadow-sm transition-all duration-200 ${
                  task.completed
                    ? "bg-gray-100 border-gray-200"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
              
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 hover:border-green-400"
                  }`}
                >
                  {task.completed && <Check size={14} />}
                </button>

                {/* Task Text */}
                <span
                  className={`flex-1 text-sm sm:text-base ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm shadow"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
