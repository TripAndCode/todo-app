'use client';

import React, { useEffect, useState } from 'react';
import TodoItem from '@/components/TodoItem';
import { Todo } from '@/types';

const TodoList: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [list, setList] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setList(data);
  };

  const handleAction = async () => {
    if (!userInput.trim()) return;

    if (editIndex !== null) {
      // Edit existing todo
      const response = await fetch(`/api/todos/${list[editIndex].id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: userInput }),
      });

      if (response.ok) {
        setEditIndex(null);
        setUserInput('');
        fetchTodos();
      }
    } else {
      // Add new todo
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: userInput }),
      });

      if (response.ok) {
        setUserInput('');
        fetchTodos();
      }
    }
  };

  const deleteItem = async (id: number) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTodos();
    }
  };

  const toggleComplete = async (id: number) => {
    const todoToToggle = list.find((item) => item.id === id);
    if (!todoToToggle) return;

    const response = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !todoToToggle.completed }),
    });

    if (response.ok) {
      fetchTodos();
    } else {
      console.error('Failed to toggle todo');
    }
  };

  const startEdit = (index: number) => {
    setUserInput(list[index].value);
    setEditIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAction();
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-center text-4xl font-bold text-green-600">TODO APP</h1>
      <h2 className="mb-6 text-center text-2xl font-bold">TODO LIST</h2>
      <div className="mb-4 flex">
        <input
          className="flex-grow rounded-l-md border p-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder={editIndex !== null ? 'Edit item...' : 'Add item...'}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="rounded-r-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
          onClick={handleAction}
        >
          {editIndex !== null ? 'Update' : 'ADD'}
        </button>
      </div>
      <div className="rounded-md bg-gray-100 p-4">
        {list.length > 0 ? (
          list.map((item, index) => (
            <TodoItem
              key={item.id}
              item={item}
              onDelete={() => deleteItem(item.id)}
              onEdit={() => startEdit(index)}
              onToggle={() => toggleComplete(item.id)}
            />
          ))
        ) : (
          <div className="text-center text-lg text-gray-500">No items in the list</div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
