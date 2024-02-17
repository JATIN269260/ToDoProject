import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'completed', or 'pending'

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "pending") {
      return !todo.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="container">
      <h1 className="heading">To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new to-do"
          className="input-text"
        />
        <button onClick={handleAddTodo} className="add-button">
          Add Task
        </button>
      </div>
      <div className="buttons-container">
        <button onClick={() => setFilter("all")} className="filter-button">
          All Tasks
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="filter-button"
        >
          Completed Tasks
        </button>
        <button onClick={() => setFilter("pending")} className="filter-button">
          Pending Tasks
        </button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="todo-checkbox"
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              className="todo-text"
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
