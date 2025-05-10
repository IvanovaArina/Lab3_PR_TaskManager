import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const API_URL = 'http://localhost:5044/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [emails, setEmails] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/Task`, {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0' },
      });
      setTasks(response.data || []);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
      setTasks([]);
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await axios.get(`${API_URL}/Email/check`, {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0' },
      });
      setEmails(response.data);
      alert('Проверил новые письма: ' + response.data.join('\n'));
    } catch (error) {
      console.error('Ошибка при проверке писем:', error);
      alert('Не удалось проверить письма.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (taskData) => {
    try {
      await axios.post(`${API_URL}/Task`, taskData, {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0' },
      });
      fetchTasks();
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
    }
  };

  const handleUpdate = async (id, taskData) => {
    try {
      await axios.put(`${API_URL}/Task/${id}`, taskData, {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0' },
      });
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/Task/${id}`, {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0' },
      });
      fetchTasks();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const handleSendEmail = async (task) => {
    try {
      const emailData = {
        toEmail: "arinaolegowna@gmail.com",
        subject: "Детали задачи",
        body: `Задача:\nID: ${task.id}\nНазвание: ${task.title}\nОписание: ${task.description}\nСтатус: ${task.isCompleted ? 'Выполнена' : 'Не выполнена'}`
      };
      await axios.post(`${API_URL}/Email/send`, emailData, {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0' },
      });
      alert('Задача отправлена по e-mail!');
    } catch (error) {
      console.error('Ошибка при отправке e-mail:', error);
      alert('Не удалось отправить e-mail.');
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
      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSendEmail={handleSendEmail}
        onCheckEmails={fetchEmails}
      />
    </div>
  );
}

export default App;