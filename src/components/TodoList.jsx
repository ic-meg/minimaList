import { useState, useRef, useEffect } from "react";
import icon from "../assets/icons/icon.svg";
import tree from "../assets/image/tree.jpg";

import NameModal from "./NameModal";
import TaskModal from "./TaskModal";
import TaskItem from "./TaskItem";
import FilterButtons from "./FilterButtons";
import ProgressBar from "./ProgressBar";
import taskApi from "../api/taskApi";

const TodoList = () => {
  const Task_API = import.meta.env.VITE_TASK_API; //api endpoint from env

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("todo");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [originalTask, setOriginalTask] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleInputRef = useRef(null);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(true);

  const [newTask, setNewTask] = useState({
    title: "",
    priority: "LOW",
    day: "MONDAY",
    tag: "IMPORTANT",
  });
  const [username, setUsername] = useState(() => {
    try {
      return localStorage.getItem("username") || "";
    } catch (e) {
      return "";
    }
  });

  // Fetch username from database if not in localStorage
  useEffect(() => {
    if (!Task_API || username) {
      setIsCheckingUsername(false);
      return; // Skip if username already set
    }
    
    let mounted = true;
    const fetchUsernameFromDB = async () => {
      setIsCheckingUsername(true);
      try {
        const { error, data } = await taskApi.fetchTasks(null);
        if (error) {
          if (mounted) setIsCheckingUsername(false);
          return;
        }
        
        if (mounted && Array.isArray(data) && data.length > 0) {
          const usernames = [...new Set(data.map(task => task.username).filter(Boolean))];
          
          if (usernames.length > 0) {
            const mostRecentTask = data.sort((a, b) => 
              new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            )[0];
            
            if (mostRecentTask && mostRecentTask.username) {
              const foundUsername = mostRecentTask.username;
              setUsername(foundUsername);
              // Save to localStorage as backup
              try {
                localStorage.setItem("username", foundUsername);
              } catch (e) {
                console.error("Failed to save username to localStorage:", e);
              }
              // Username found and set, checking is complete
              if (mounted) setIsCheckingUsername(false);
              return;
            }
          }
        }
        
        // If we reach here, no username was found
        // The finally block will set isCheckingUsername to false
      } catch (err) {
        console.error("Failed to fetch username from database:", err);
      } finally {
        if (mounted) setIsCheckingUsername(false);
      }
    };
    
    fetchUsernameFromDB();
    return () => {
      mounted = false;
    };
  }, [Task_API, username]);

  //fetch tasks from api
  useEffect(() => {
    if (!Task_API || !username) return; // Don't fetch if no username
    let mounted = true;
    const fetchItems = async () => {
      setLoading(true);
      try {
        const { error, data } = await taskApi.fetchTasks(username);
        if (error) setFetchError(error);
        else if (mounted) setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        setFetchError(err.message || "Failed to fetch tasks.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchItems();
    return () => {
      mounted = false;
    };
  }, [Task_API, username]); // Add username as dependency


  useEffect(() => {
    if (nameModalOpen) setNameError(null);
  }, [nameModalOpen]);

  useEffect(() => {
    // Only show modal if username is empty AND we've finished checking the database
    if (!isCheckingUsername) {
      setNameModalOpen(username === "");
    }
  }, [username, isCheckingUsername]);

  useEffect(() => {
    if (showModal) {
      if (titleInputRef.current) titleInputRef.current.focus();
      setFetchError(null);
    } else {
      // Reset submitting state and editing state when modal closes
      setIsSubmitting(false);
      setEditingTaskId(null);
      setOriginalTask(null);
    }
  }, [showModal]);

  // patch toggle complete
  const toggleComplete = async (id) => {
    if (!username) return; // Don't update if no username
    const existing = tasks.find((t) => t.id === id);
    if (!existing) return;

    const newCompleted = !existing.completed;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t)));

    const { error } = await taskApi.updateTask(id, { completed: newCompleted }, username);

    if (error) {
      setFetchError(error);
      // rollback
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: existing.completed } : t)));
    }
  };

  //delete task from api
  const deleteTask = async (id) => {
    if (!username) return; // Don't delete if no username
    setTasks((prev) => prev.filter((task) => task.id !== id));

    const { error } = await taskApi.deleteTask(id, username);
    if (error) setFetchError(error);
  };

  const filteredTasks =
    filter === "todo"
      ? tasks.filter((t) => !t.completed)
      : tasks.filter((t) => t.completed);

  //edit button api logic
  const handleEdit = async (id)  => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setNewTask({
      title: task.title || "",
      priority: task.priority || "LOW",
      day: task.day || "MONDAY",
      tag: task.tag || "IMPORTANT",
      completed: task.completed || false,
    });
    // Store original task for comparison
    setOriginalTask({ ...task });
    setEditingTaskId(id);
    setShowModal(true);
  };

  // Helper functions for normalization
  const normalizeTag = (t) => {
    if (!t) return "IMPORTANT";
    if (typeof t !== "string") return t.toUpperCase();
    const trimmed = t.trim().toUpperCase();
    if (trimmed === "NOT IMPORTANT" || trimmed === "NOTIMPORTANT") return "NOTIMPORTANT";
    return trimmed.replace(/\s+/g, "");
  };

  const normalizeDay = (d) => {
    if (!d) return "MONDAY";
    if (typeof d !== "string") return String(d).toUpperCase();
    const trimmed = d.trim().toUpperCase();
    if (trimmed === "NEXT WEEK") return "NEXTWEEK";
    return trimmed.replace(/\s+/g, "");
  };

  // add task logic
  const addTask = async () => {
    if (!username) {
      setError("Please enter your name first.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    
    if (!newTask.title.trim()) {
      setError("Please enter a task title.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setIsSubmitting(true);
    
    if (editingTaskId) {
      const payload = {
        title: newTask.title.trim(),
        priority: (newTask.priority || "LOW").toUpperCase(),
        day: normalizeDay(newTask.day),
        tag: normalizeTag(newTask.tag),
        completed: newTask.completed || false,
      };

      // Compare with original task to detect changes
      if (originalTask) {
        const normalizedOriginal = {
          title: (originalTask.title || "").trim(),
          priority: (originalTask.priority || "LOW").toUpperCase(),
          day: normalizeDay(originalTask.day),
          tag: normalizeTag(originalTask.tag),
          completed: originalTask.completed || false,
        };

        // Check if there are any changes
        const hasChanges = 
          payload.title !== normalizedOriginal.title ||
          payload.priority !== normalizedOriginal.priority ||
          payload.day !== normalizedOriginal.day ||
          payload.tag !== normalizedOriginal.tag ||
          payload.completed !== normalizedOriginal.completed;

        if (!hasChanges) {
          setError("No changes detected.");
          setTimeout(() => setError(""), 2000);
          setIsSubmitting(false);
          return;
        }
      }

      try {
        const { error: perr, data: pdata, message } = await taskApi.updateTask(editingTaskId, payload, username);
        if (perr) {
          setFetchError(perr);
          setIsSubmitting(false);
          return;
        }

        // update local list
        setTasks((prev) => prev.map((t) => (t.id === editingTaskId ? (pdata || { ...t, ...payload }) : t)));
      setEditingTaskId(null);
      setShowModal(false);
      setNewTask({ title: "", priority: "LOW", day: "MONDAY", tag: "IMPORTANT" });
      setOriginalTask(null);
        //  Show success message
        if (message) {
          setFetchError(null);
        }
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const payload = {
      title: newTask.title.trim(),
      priority: (newTask.priority || "LOW").toUpperCase(),
      day: normalizeDay(newTask.day),
      tag: normalizeTag(newTask.tag),
      completed: newTask.completed || false,
      username: username, // Add username to payload
    };

    try {
      const { error, data, message } = await taskApi.createTask(payload);
      if (error) {
        setFetchError(error);
        setIsSubmitting(false);
        return;
      }

      // Use server-created resource or refresh list
      if (data && data.id) setTasks((prev) => [...prev, data]);
      else {
        const { error: e2, data: list } = await taskApi.fetchTasks(username);
        if (e2) setFetchError(e2);
        else setTasks(Array.isArray(list) ? list : []);
      }
      setShowModal(false);
      setNewTask({
        title: "",
        priority: "LOW",
        day: "MONDAY",
        tag: "IMPORTANT",
      });
      setOriginalTask(null);
      setError("");
      //  Show success message 
      if (message) {
        setFetchError(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      const trimmedName = tempName.trim();
      setUsername(trimmedName);
      // Save to localStorage
      try {
        localStorage.setItem("username", trimmedName);
      } catch (e) {
        console.error("Failed to save username to localStorage:", e);
      }
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
          error={nameError}
        />
      )}
      {showModal && (
        <TaskModal
          titleInputRef={titleInputRef}
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          setShowModal={setShowModal}
          error={fetchError || error}
          submitLabel={editingTaskId ? "Save" : "Submit"}
          isSubmitting={isSubmitting}
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
            {(username || "").toLowerCase()}'s to-do list
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
          <div className="hidden sm:flex justify-between items-center text-xs text-fontgray-500 -medium px-4">
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
          {isLoading ? (
            <div className="w-full text-center text-gray-500 py-10 text-sm italic">
              Loading tasks...
            </div>
          ) : fetchError ? (
            <div className="w-full bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-sm">
              {fetchError}
            </div>
          ) : filteredTasks.length === 0 ? (
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
                  onEdit={handleEdit}
                />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TodoList;
