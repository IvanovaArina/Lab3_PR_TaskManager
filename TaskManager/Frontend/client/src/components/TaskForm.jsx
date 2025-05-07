import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, editingTask, clearEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        isCompleted: editingTask.isCompleted || false,
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      onSubmit(editingTask.id, formData);
    } else {
      // При создании отправляем только title и description
      const { title, description } = formData;
      onSubmit({ title, description });
    }
    setFormData({ title: '', description: '', isCompleted: false });
  };

  const handleCancel = () => {
    clearEdit();
    setFormData({ title: '', description: '', isCompleted: false });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {editingTask ? 'Редактировать задачу' : 'Создать задачу'}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Название</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Описание
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {editingTask && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Статус
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isCompleted"
                checked={formData.isCompleted}
                onChange={handleChange}
                className="h-5 w-5 text-green-500"
              />
              <span>{formData.isCompleted ? 'Выполнена' : 'Не выполнена'}</span>
            </label>
          </div>
        )}
        <div className="flex space-x-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {editingTask ? 'Обновить' : 'Создать'}
          </button>
          {editingTask && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Отмена
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskForm;