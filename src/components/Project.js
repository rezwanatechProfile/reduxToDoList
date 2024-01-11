// Project.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProjectForm from './ProjectForm';
import { removeProject } from '../features/todo/todoSlice';

const Project = ({ project }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const handleRemove = () => {
    dispatch(removeProject(project.id));
  };

  return (
    <div>
      <h3>Title: {project.objective}</h3>
      <p>Start Date: {project.startDate}</p>
      <p>Due Date: {project.dueDate}</p>
      <p>Task: {project.tasks}</p>
      {/* Display other project details */}

      <button onClick={() => setEditMode(true)} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</button>
      <button onClick={handleRemove} className="py-2 px-4 ml-4 mt-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Remove</button>

      {editMode && (
        <ProjectForm
          project={project}
          onClose={() => setEditMode(false)}
        />
      )}
    </div>
  );
};

export default Project;
