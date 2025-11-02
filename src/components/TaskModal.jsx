const TaskModal = ({
  titleInputRef,
  newTask,
  setNewTask,
  addTask,
  setShowModal,
  error,
  submitLabel = "Submit",
  isSubmitting = false,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60  font-ia">
    <div className="bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-2xl p-10 space-y-8 animate-fadeIn scale-100 transition-transform duration-300">
      {/* New Task */}
      <input
        type="text"
        ref={titleInputRef}
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isSubmitting) {
            e.preventDefault();
            addTask();
          }
        }}
        placeholder="New Task (max 50 chars)"
        maxLength={50}
        disabled={isSubmitting}
        className="w-full text-4xl font-bold outline-none placeholder:text-gray-400 border-b-2 border-transparent caret-black disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {/* Fields */}
      <div className="space-y-5 text-base text-gray-700">
        <div className="flex items-center gap-4">
          <label className="w-24 font-medium">Priority</label>
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            disabled={isSubmitting}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 font-medium">Day</label>
          <select
            value={newTask.day}
            onChange={(e) => setNewTask({ ...newTask, day: e.target.value })}
            disabled={isSubmitting}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="MONDAY">Monday</option>
            <option value="TUESDAY">Tuesday</option>
            <option value="WEDNESDAY">Wednesday</option>
            <option value="THURSDAY">Thursday</option>
            <option value="FRIDAY">Friday</option>
            <option value="SATURDAY">Saturday</option>
            <option value="SUNDAY">Sunday</option>
            <option value="NEXTWEEK">Next Week</option>
            <option value="LATER">Later</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 font-medium">Tag</label>
          <select
            value={newTask.tag || ""}
            onChange={(e) => setNewTask({ ...newTask, tag: e.target.value })}
            disabled={isSubmitting}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="IMPORTANT">Important</option>
            <option value="NOTIMPORTANT">Not Important</option>
          </select>
        </div>
      </div>
      {error && (
        <div className="text-red-600 bg-red-100 border border-red-400 rounded px-4 py-2 text-sm">
          {error}
        </div>
      )}
      {/* Cancel + Submit */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={() => setShowModal(false)}
          disabled={isSubmitting}
          className="px-5 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={addTask}
          disabled={isSubmitting}
          className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>


    </div>
    
  </div>
);

export default TaskModal;
