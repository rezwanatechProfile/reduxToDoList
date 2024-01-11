import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, markAsPriority } from '../features/todo/todoSlice'


function AddTodo() {

  const todos = useSelector((state) => state.todos);
  const [input, setInput] = useState('')
  const [date, setDate] = useState('');
  const dispatch = useDispatch()
  const [isPriority, setIsPriority] = useState(false); // New state for priority

  const addTodoHandler = (e) => {
    // console.log("clicked")
    e.preventDefault()
    if (input.trim() === '' || date.trim() === '') {
      return;
    }

    // console.log('Adding todo:', input);
 // Dispatch the addTodo action with text, date, and priority
   dispatch(addTodo({ text: input, date, isPriority }));
 // If the todo is marked as priority, also dispatch the markAsPriority action
   if (isPriority) {
    const addedTodo = todos.find((todo) => todo.text === input && todo.date === date);

    if (addedTodo) {
     dispatch(markAsPriority({ id: addedTodo.id }));
}
  }

    setInput('')
    setDate('')
    setIsPriority(false);
  }



  return (
    <div className="overflow-hidden rounded-lg shadow-lg pb-10 block">
      <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
        <div className="w-full flex flex-col items-start ml-5">
          <input
            type="text"
            className="w-full lg:w-3/4 xl:w-3/4 mb-5 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none
      text-gray-100 p-2 px-3leading-8 transition-colors duration-200"
            placeholder="Enter a Todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex items-center">

          <input
            type="date"
            className="mb-5 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none
        text-gray-100 py-1 px-3 leading-8 transition-colors duration-200"
            placeholder="Select a Date..."
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />


            <label className="text-white mr-4">Priority:</label>
            <input
              type="checkbox"
              checked={isPriority}
              onChange={() => setIsPriority(!isPriority)}
              className="mr-2 h-6 w-6"
            />
            <span className="text-red-500 font-bold mr-8 bg-gray-800 rounded border border-gray-700 text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none">Priority</span>
          </div>



          <button
            type="submit"
            className="text-white flex items-center bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo
