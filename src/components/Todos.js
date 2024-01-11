import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, editTodo, markAsComplete } from '../features/todo/todoSlice'
import ProjectForm from './ProjectForm';

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch()

  const [isFormOpen, setIsFormOpen] = useState(false);

  // State to track edit mode
  const [editMode, setEditMode] = useState({});
  // State to track edited text
  const [editedText, setEditedText] = useState({});




  // Function to handle editing
  const handleEdit = (todoId) => {
       // Set edit mode to true for the specific todo
       setEditMode((prevModes) => ({ ...prevModes, [todoId]: true }));

       // Initialize edited text with the current todo text
       setEditedText((prevTexts) => ({ ...prevTexts, [todoId]: todos.find((todo) => todo.id === todoId).text }));
  };

  // Function to handle save (dispatches editTodo action) for a specific todo
  const handleSave = (todoId) => {
    // Dispatch editTodo action with todo id and edited text
    dispatch(editTodo({ id: todoId, text: editedText[todoId] }));

    // Set edit mode to false for the specific todo
    setEditMode((prevModes) => ({ ...prevModes, [todoId]: false }));
  };

  const handleCheckboxChange = (id) => {
    // Dispatch the markAsComplete action with the todo id
    dispatch(markAsComplete({ id }));
  };

  // To open a form
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };




  return (
    <>
    <button onClick={handleOpenForm} className="py-2 px-4 flex flex-col border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-auto">Add Project</button>
    {isFormOpen && <ProjectForm onClose={() => setIsFormOpen(false)} />}
    <h2 className='font-bold text-xl text-teal-800'>Lists of Task</h2>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mt-4 flex flex-col lg:flex-row lg:flex-wrap bg-zinc-800 px-4 py-2 rounded justify-between"
          >
            <div
              className={`mb-2 lg:mb-0 lg:mr-4 ${
                todo.priority ? "text-red-500" : "text-white"
              }`}
            >
              {todo.date}
            </div>
            <div
              className={`mb-2 lg:mb-0 lg:mr-4 ${
                todo.priority ? "text-red-500" : "text-white"
              }`}
            >
              {todo.text}
            </div>
            {editMode[todo.id] ? (
              <div className="flex items-center">
                <input
                  className="mr-4 p-2"
                  type="text"
                  value={editedText[todo.id]}
                  onChange={(e) =>
                    setEditedText((prevTexts) => ({
                      ...prevTexts,
                      [todo.id]: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={() => handleSave(todo.id)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                {/* Checkbox for completed task */}

                <input
                  className="ml-2"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
                <span className="ml-2 mr-5 text-white">Complete</span>

                <button
                  onClick={() => handleEdit(todo.id)}
                  className="mr-4 text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  DELETE
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
