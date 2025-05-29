const TaskItem = ({ task, toggleComplete, deleteTask }) => (
  <div
    key={task.id}
    className="flex justify-between items-start bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
  >
    <div className="flex items-start space-x-3 w-full max-w-[60%]">
      <button
        onClick={() => toggleComplete(task.id)}
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors cursor-pointer ${
          task.completed
            ? "bg-blue-600 border-blue-600 text-white"
            : "border-gray-400 text-transparent"
        }`}
      >
        {task.completed && (
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      <p
        className={`font-semibold ${
          task.completed ? "line-through text-gray-400" : "text-gray-900"
        }`}
      >
        {task.title}
      </p>
    </div>

    <div className="flex items-center gap-4">
      {/*  (priority, day, tags) */}
      <div className="flex flex-wrap justify-end gap-2 text-sm">
        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
          {task.priority}
        </span>
        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">
          {task.day}
        </span>
        {task.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* delete btnn */}
      <button
        onClick={() => deleteTask(task.id)}
        className="text-gray-400 hover:text-red-600 transition cursor-pointer"
        title="Delete Task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1zm-6 4h14"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default TaskItem;
