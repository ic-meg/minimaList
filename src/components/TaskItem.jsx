const TaskItem = ({ task, toggleComplete, deleteTask, onEdit }) => (
  <div
    key={task.id}
    className="flex justify-between items-start bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
  >

    <div className="flex items-start space-x-3 w-full max-w-[60%]">
      <button
        onClick={() => toggleComplete(task.id)}
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors cursor-pointer ${
          task.completed
            ? "bg-green-600 border-green-600 text-white"
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
          <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
            {task.tag === 'NotImportant' ? 'Not Important' : task.tag}
          </span>
      </div>

      <div className="flex items-center space-x-2">
        {/* edit button */}
        <button
          onClick={() => onEdit && onEdit(task.id)}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-green-600 transition rounded relative pt-1 pl-4"
          title="Edit Task"
          aria-label={`Edit task ${task.title}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 010 2.828l-9.193 9.193a1 1 0 01-.464.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.464l9.193-9.193a2 2 0 012.828 0zM15.121 4.05l-.707.707L14 4.343l.828-.828.293.535z" />
          </svg>
        </button>

        {/* delete button */}
        <button
          onClick={() => deleteTask(task.id)}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 transition rounded"
          title="Delete Task"
          aria-label={`Delete task ${task.title}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
  </div>
);

export default TaskItem;
