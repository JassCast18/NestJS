import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/items";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children, token }) {
  const [tasks, setTasks] = useState([]);

  // Obtener todas las tareas
  const getTasks = async () => {
    try {
      const res = await getTasksRequest(token);
      setTasks(res.data);
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Crear nueva tarea
  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task, token);
      setTasks(prev => [...prev, res.data]);
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Actualizar tarea
  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task, token);
      setTasks(prev => prev.map(t => (t.id === id ? res.data : t)));
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    try {
      await deleteTaskRequest(id, token);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Obtener una tarea específica
  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id, token);
      return res.data;
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Manejo centralizado de errores de autorización
  const handleAuthError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        alert("No estás autorizado. Por favor haz login.");
      } else {
        alert(error.response.data.message || "Error al procesar la solicitud");
      }
    } else {
      alert("Error de conexión con el servidor");
    }
    console.error(error);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        getTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
