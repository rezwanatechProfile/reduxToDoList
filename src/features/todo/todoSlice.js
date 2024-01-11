// In Redux, a "slice" refers to a portion of your Redux state that is managed by a reducer. Slices are a way to modularize and organize your Redux state and logic. They are often associated with the concept of "Redux Toolkit," a set of tools and utilities that simplifies the process of working with Redux.

// Redux Toolkit provides a createSlice function that helps you define a reducer along with its actions in a more concise and intuitive way.
// also collected here, starting point and the initial state.
// nanoid is a function that generates a unique identifier.

import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
  todos: [{id:1, text:"Hello", date: '2023-11-21', priority: false}],
  completedTodos: [],
  priorityLists: [],
  projects: [],

}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  // The reducers field is where you define functions that will handle state changes for different actions.
  reducers: {
    // by action we send data. Payload means data

    // Defines an action named addTodo that, when dispatched, adds a new todo to the todos array in the state.
    // It generates a unique id for the new todo using the nanoid function.
    // The text of the new todo is taken from the payload property of the action.

    addTodo: (state, action) => {

      const { text, date, isPriority } = action.payload;

      const todo = {
        id: nanoid(), //Generates a unique id for the new todo using the nanoid function.
        text,
        date,
        priority: isPriority || false, //If the todo is marked as priority, it also adds it to the priorityLists array.
      };

      return {
        ...state, //Return a new state object using the spread operator (...state).
        todos: [...state.todos, todo], //Update the todos array by adding the new todo.
        // If the todo is marked as priority, also add it to the priorityTodos array
        ...(todo.priority
          ? { priorityLists: [...state.priorityLists, todo] }
          : {}), //If the todo is marked as priority, update the priorityLists array by adding the new todo.
      };
    },
    // It uses the filter method to create a new array that includes only the elements for which the given function returns true.
    // It uses the filter method to create a new array excluding the todo with the id specified in the payload property of the action.

    removeTodo: (state, action) => {
      // Remove the todo from both state.todos and state.completedTodos
      state.todos = state.todos.filter((todo) => todo.id !== action.payload); //filter method to create a new todos array that excludes the todo with the id specified in the action payload.
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo.id !== action.payload
      ); //Update the completedTodos array using the same approach.
    },

    editTodo: (state, action) => {
      // Find the index of the todo with the specified id
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      // If the todo with the given id is found (index !== -1), update its text property
      if (index !== -1) {
        state.todos[index].text = action.payload.text;
      }
    },

    markAsComplete: (state, action) => {
  // Extracting the 'id' property from the payload of the action
      const { id } = action.payload;
  // Finding the index of the todo with the specified id in the 'todos' array
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);

      if (todoIndex !== -1) {
        // Mark the todo as complete
        state.todos[todoIndex].completed = true;


    // Move the completed todo to the completedTodos array
    // The splice method modifies the original array, removing or replacing elements.
        const completedTodo = state.todos.splice(todoIndex, 1)[0];
        state.completedTodos.push(completedTodo);


    // if the priority task is complete then move it to the completed task
        if (completedTodo.priority) {
          const priorityIndex = state.priorityLists.findIndex(
            (todo) => todo.id === id
          );
          if (priorityIndex !== -1) {
            state.priorityLists.splice(priorityIndex, 1);
          }
        }
      }
    },

    markAsPriority: (state, action) => {
      const { id } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);

      if (todoIndex !== -1) {
        state.todos[todoIndex].priority = true;

        const priorityTodo = state.todos.splice(todoIndex, 1)[0];
        state.priorityLists.push(priorityTodo);
      }
    },
    // PROJECT REDUCERS
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },

    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },

    editProject: (state, action) => {
      const { id, ...updatedProject } = action.payload;
      const projectIndex = state.projects.findIndex(
        (project) => project.id === id
      );
      if (projectIndex !== -1) {
        state.projects[projectIndex] = {
          ...state.projects[projectIndex],
          ...updatedProject,
        };
      }
    },
  },
});
// Exports the addTodo, removeTodo actions for use in other parts of the application.
export const { addTodo, removeTodo, editTodo, markAsComplete, markAsPriority, addProject, removeProject, editProject } = todoSlice.actions

// it needs to wire up with the store
export default todoSlice.reducer