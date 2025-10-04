const TaskModal = ({
  titleInputRef,
  newTask,
  setNewTask,
  addTask,
  setShowModal,
  error,
  submitLabel = "Submit",
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
          if (e.key === "Enter") {
            e.preventDefault();
            addTask();
          }
        }}
        placeholder="New Task (max 50 chars)"
        maxLength={50}
        className="w-full text-4xl font-bold outline-none placeholder:text-gray-400 border-b-2 border-transparent caret-black"
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
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 font-medium">Day</label>
          <select
            value={newTask.day}
            onChange={(e) => setNewTask({ ...newTask, day: e.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
            <option>Next Week</option>
            <option>Later</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 font-medium">Tag</label>
          <select
            value={newTask.tag || ""}
            onChange={(e) => setNewTask({ ...newTask, tag: e.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          >
            <option value="Important">Important</option>
            <option value="NotImportant">Not Important</option>
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
          className="px-5 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={addTask}
          className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
        >
          {submitLabel}
        </button>
      </div>


    </div>
    
  </div>
);

export default TaskModal;
