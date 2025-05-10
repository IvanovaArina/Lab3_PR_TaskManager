import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, onSendEmail, onCheckEmails }) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="border p-4 rounded shadow flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">
              Статус: {task.isCompleted ? 'Выполнена' : 'Не выполнена'}
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Редактировать
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Удалить
            </button>
            <button
              onClick={() => onSendEmail(task)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Отправить по e-mail
            </button>
          </div>
        </li>
      ))}
      <button
        onClick={onCheckEmails}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Проверить новые письма
      </button>
    </ul>
  );
};

export default TaskList;