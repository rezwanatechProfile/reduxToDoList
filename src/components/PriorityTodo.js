
import React from 'react';
import { useSelector } from 'react-redux';

const PriorityTodo = () => {
  const priorityLists = useSelector((state) => state.priorityLists);

  return (
    <div className='overflow-hidden rounded-lg shadow-lg border border-gray-700 pb-10'>
      <h1 className="text-lg bg-red-500 p-2 font-bold">Priority Lists</h1>
      <ul className='p-5 list-disc'>
        {priorityLists.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default PriorityTodo;