import axios from "./axios";

// GET /items
export const getTasksRequest = async (token) => {
  return axios.get("/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

// POST /items
export const createTaskRequest = async (task, token) => {
  return axios.post("/items", task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

// PUT /items/:id
export const updateTaskRequest = async (id, task, token) => {
  return axios.patch(`/items/${id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

// DELETE /items/:id
export const deleteTaskRequest = async (id, token) => {
  return axios.delete(`/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

// GET /items/:id
export const getTaskRequest = async (id, token) => {
  return axios.get(`/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};
