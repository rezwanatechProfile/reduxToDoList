// CompleteTodo.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo } from '../features/todo/todoSlice'

const CompleteTodo = () => {

  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };


  const completedTodos = useSelector((state) => state.completedTodos);

  return (
    <div className="overflow-hidden rounded-lg shadow-lg border border-gray-700 pb-10">
      <h1 className="text-lg bg-indigo-500 p-2 font-bold">Completed Todos</h1>
      <ul className="p-5 list-disc">
        {completedTodos.map((todo) => (
          <li key={todo.id} className="flex justify-between">{todo.text}
             <button
              onClick={() => handleDelete(todo.id)}
             className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
           >
             DELETE
           </button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompleteTodo;