import { useState, useRef, useEffect } from "react";
import icon from "../assets/icons/icon.svg";
import tree from "../assets/image/tree.jpg";

import NameModal from "./NameModal";
import TaskModal from "./TaskModal";
import TaskItem from "./TaskItem";
import FilterButtons from "./FilterButtons"; 
import ProgressBar from "./ProgressBar";

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks"); // holds data from localStorage (if any)
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // update localStorage
  }, [tasks]);

  const [filter, setFilter] = useState("todo");

  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Low",
    day: "Monday",
    tags: ["Important"],
  });

  const titleInputRef = useRef(null);

  const [error, setError] = useState("");

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [nameModalOpen, setNameModalOpen] = useState(!username);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    if (showModal && titleInputRef.current) {
      titleInputRef.current.focus(); // focus title input when modal shows
    }
  }, [showModal]);
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks =
    filter === "todo"
      ? tasks.filter((t) => !t.completed)
      : tasks.filter((t) => t.completed);
      
  // add task logic
  const addTask = () => {
    if (!newTask.title.trim()) {
      setError("Please enter a task title.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...newTask,
        completed: false,
      },
    ]);
    setShowModal(false);
    setNewTask({
      title: "",
      priority: "Low",
      day: "Monday",
      tags: ["Important"],
    });

    setError("");
  };
  const handleNameSubmit = () => {
    if (tempName.trim()) {
      setUsername(tempName.trim());
      localStorage.setItem("username", tempName.trim());
      setNameModalOpen(false);
    }
  };

  return (
    <>
      {nameModalOpen && (
        <NameModal
          tempName={tempName}
          setTempName={setTempName}
          handleNameSubmit={handleNameSubmit}
        />
      )}
      {showModal && (
        <TaskModal
          titleInputRef={titleInputRef}
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          setShowModal={setShowModal}
          error={error}
        />
      )}

      <div className=" w-full font-ia">
        {/* Header */}
        <div
          className="w-full h-[150px] sm:h-[200px] bg-cover bg-center"
          style={{ backgroundImage: `url(${tree})` }}
        ></div>

        {/* Icon and Label */}
        <div className="absolute top-28 left-6 sm:top-36 sm:left-20 flex flex-col items-start">
          <img src={icon} alt="Notepad" className="w-16 sm:w-24" />
          <p className="text-2xl font-bold lowercase mt-2">
            {username.toLowerCase()}'s to-do list
          </p>

          <p className="w-[1000px]} bg-green-50 text-gray-800 px-6 sm:px-20 py-3 mt-6 rounded text-sm font-mono border-l-4 border-gray-700">
            MinimaList — Clear Mind. Clean List.
          </p>
        </div>

        <div className="mt-[200px] px-6 sm:px-20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2">
          {/* Filter Buttons */}
          <FilterButtons filter={filter} setFilter={setFilter} />

          {/* Progress Bar */}
          {tasks.length > 0 && (
            <ProgressBar
              completedCount={tasks.filter((t) => t.completed).length}
              totalCount={tasks.length}
            />
          )}

          {/*  Add btn */}
          <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-6 right-6 z-50 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gray-800 transition cursor-pointer"
            title="Add Task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Header table */}
        <div className="px-6 sm:px-20 mb-2">
          <div className="hidden sm:flex justify-between items-center text-xs text-gray-500 font-medium px-4">
            {/* Desktop Header */}
            <div className="flex items-center space-x-3 w-full max-w-[60%]">
              <span className="w-5"></span>
              <span>task</span>
            </div>
            <div className="flex items-center gap-4 text-nowrap">
              <span className="w-16">priority</span>
              <span className="w-12">day</span>
              <span className="w-20">tags</span>
              <span className="w-6">action</span>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="sm:hidden text-xs text-gray-500 font-medium px-2 mb-2">
            <div className="flex justify-between">
              <span>task</span>
              <span>details</span>
            </div>
          </div>
        </div>

        {/* to-do listss */}
        <div className="px-6 sm:px-20 space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center text-gray-400 py-10 text-sm italic">
              {filter === "todo"
                ? "No tasks to do right now."
                : "No completed tasks yet."}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TodoList;
