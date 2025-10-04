import apiRequest from "./apiRequest";

const BASE = import.meta.env.VITE_TASK_API;

const missing = () => ({ error: "No Task API configured.", status: null, data: null });

const fetchTasks = async () => {
  if (!BASE) return missing();
  return await apiRequest(BASE, null);
};

const createTask = async (payload) => {
  if (!BASE) return missing();
  return await apiRequest(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const updateTask = async (id, payload) => {
  if (!BASE) return missing();
  return await apiRequest(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const deleteTask = async (id) => {
  if (!BASE) return missing();
  return await apiRequest(`${BASE}/${id}`, { method: "DELETE" });
};

export default { fetchTasks, createTask, updateTask, deleteTask };
