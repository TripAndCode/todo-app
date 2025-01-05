import React from 'react';
import { Todo } from '@/types';

interface TodoItemProps {
  item: Todo;
  onDelete: () => void;
  onEdit: () => void;
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onDelete, onEdit, onToggle }) => {
  return (
    <div className="mb-2 flex items-center justify-between rounded bg-white p-2 shadow">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={onToggle}
          className="mr-2 h-5 w-5"
        />
        <span className={`text-lg ${item.completed ? 'text-gray-500 line-through' : ''}`}>
          {item.value}
        </span>
      </div>
      <div>
        <button
          className="mr-2 rounded bg-blue-500 px-2 py-1 text-white transition duration-300 hover:bg-blue-600"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="rounded bg-red-500 px-2 py-1 text-white transition duration-300 hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
