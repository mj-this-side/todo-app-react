import { useEffect, useState } from "react";
import "./Todo.css";
import React from "react";

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  

  const [todo, setTodo] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [currentTodo, setCurrentTodo] = useState({});

  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }

    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }
      
  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);

    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);

    setCurrentTodo({ ...todo });
  }
  
  

  return (
    <div>
      {isEditing ? (
        <div>
          <form onSubmit={handleEditFormSubmit}>
            <h2>Practical Assignment</h2>
            <h3>To Do list</h3>
            <h5>Edit to do</h5>

            <label htmlFor="editTodo">Edit todo: </label>
                                       
            <input
              name="editTodo"
              type="text"
              placeholder="Edit todo"
              value={currentTodo.text}
              onChange={handleEditInputChange}
            />

            <button type="submit">Update</button>

            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <div>
          <input type="text" placeholder="search here..." />
         
          <form onSubmit={handleFormSubmit}>
            <h2>Practical Assignment</h2>
            <h3>To Do List</h3>

            <label htmlFor="todo">Add task: </label>

            <input
              name="todo"
              type="text"
              placeholder="Create a new todo"
              value={todo}
              onChange={handleInputChange}            
            />

            <button type="submit">add</button>
          </form>
        </div>
      )}
      <div className="list">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}

              <button onClick={() => handleEditClick(todo)}>Edit</button>
              <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
