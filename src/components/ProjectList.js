

import React from 'react';
import { useSelector } from 'react-redux';
import Todos from './Todos';
import Project from './Project';
import { addProject } from '../features/todo/todoSlice';

const ProjectList = () => {
  const projects = useSelector((state) => state.projects);

  // const [showForm, setShowForm] = useState(false);

  // const handleAddProject = (projectData) => {
  //   // Dispatch the action to add the project
  //   dispatch(addProject(projectData));
  //   // Optionally, close the form after submission
  //   setShowForm(false);
  // };

  return (
    <div className="overflow-hidden rounded-lg shadow-lg border border-gray-700 pb-10">
      <h2 className="text-white text-lg bg-zinc-800 p-2 font-bold">Projects</h2>
      <div className="p-5">
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
