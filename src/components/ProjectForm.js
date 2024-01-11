// ProjectForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addProject, editProject } from '../features/todo/todoSlice';

const ProjectForm = ({ project, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    startDate: project?.startDate || '',
    dueDate: project?.dueDate || '',
    objective: project?.objective || '',
    tasks: project?.tasks || '',
    dateCompleted: project?.dateCompleted || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: project?.id || nanoid(), // Use existing ID for editing, generate a new one for new projects
      ...formData,
    };

    if (project) {
      // If editing, dispatch editProject action
      dispatch(editProject(newProject));
    } else {
      // If adding new, dispatch addProject action
      dispatch(addProject(newProject));
    }

    onClose(); // Close the form after submitting
  };

  const handleCancel = () => {
    // Close the form without saving
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg sm:p-6">

        <form onSubmit={handleSubmit}>
          <div className="mb-4">

          <div className="mb-4">
              <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
                Project Title
              </label>
              <input
                type="text"
                name="objective"
                id="objective"
                value={formData.objective}
                onChange={handleChange}
                placeholder="Title"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>


            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="Start Date"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                placeholder="Due Date"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tasks" className="block text-sm font-medium text-gray-700">
                Tasks
              </label>
              <input
                type="text"
                name="tasks"
                id="tasks"
                value={formData.tasks}
                onChange={handleChange}
                placeholder="Tasks"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dateCompleted" className="block text-sm font-medium text-gray-700">
                Date Completed
              </label>
              <input
                type="date"
                name="dateCompleted"
                id="dateCompleted"
                value={formData.dateCompleted}
                onChange={handleChange}
                placeholder="Date Completed"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
              <button type="button" onClick={handleCancel} className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
