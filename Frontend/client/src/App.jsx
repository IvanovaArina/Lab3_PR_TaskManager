import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const API_URL = 'http://localhost:5044/api/Task'; // Настройте под ваш API

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Cache-Control': 'no-cache', // Отключаем кэширование
          'Pragma': 'no-cache',
          'Expires': '0',
        },});
      setTasks(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (taskData) => {
    try {
      await axios.post(API_URL, taskData);
      fetchTasks();
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
    }
  };

  const handleUpdate = async (id, taskData) => {
    try {
      await axios.put(`${API_URL}/${id}`, taskData);
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Менеджер задач</h1>
      <TaskForm
        onSubmit={editingTask ? handleUpdate : handleCreate}
        editingTask={editingTask}
        clearEdit={() => setEditingTask(null)}
      />
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;