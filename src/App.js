import './index.css';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import CompleteTodo from './components/CompleteTodo';
import PriorityTodo from './components/PriorityTodo';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <div className="container my-12 mx-auto px-4 pt-4 pb-20 md:px-12 bg-cyan-50">
      <h1 className="flex justify-center font-bold text-5xl italic -mt-12 text-teal-500 font-mono">
        TodoTracker
      </h1>
      <div className="flex flex-col lg:flex-row mt-12">
        <div className="my-1 px-1 w-full lg:my-4 lg:w-1/3">
          <AddTodo />
        </div>

        <div className="my-1 px-1 w-full lg:my-4 lg:w-1/2 ml-2">
          <Todos />
        </div>
      </div>

      <div className="flex">
        <div className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-1 lg:w-1/3">
          <CompleteTodo />
        </div>

        <div className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/2">
          <PriorityTodo />
        </div>

        <div className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/2">
          <ProjectList />
        </div>
      </div>
    </div>
  );
}

export default App;
