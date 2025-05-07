import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Список задач</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">Задачи отсутствуют.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
            >
              <div>
                <h3 className="text-lg font-medium">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Статус: {task.isCompleted ? 'Выполнена' : 'Не выполнена'}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;