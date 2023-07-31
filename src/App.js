import React, { useState } from 'react';
import './App.css';

function HeroSection() {
  return (
    <div className="hero">
      <h1>Todo List</h1>
      <p>Make every day a step forward towards your goals!</p>
    </div>
  );
}

function TodoItem({ item, toggleTask, deleteTask }) {
  return (
    <li className={`task ${item.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleTask(item.id)}>{item.text}</span>
      <button onClick={() => deleteTask(item.id)}>Delete</button>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="App">
      <HeroSection />
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            item={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
