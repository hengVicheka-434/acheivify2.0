import React, { useState, useEffect } from "react";
import PageContent from "../components/PageContent";
import "../styles/App.css";

const ToDo = () => {
  const localStorageKey = "taskListData";
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      // Auto-remove tasks completed more than 1 day ago
      const filtered = parsed.filter(
        (task) => !(task.checked && now - task.addedTimestamp >= oneDay)
      );

      setTasks(filtered);
    }
  }, []);

  // Save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();

    const form = e.target;
    const input = form.task;
    const name = input.value.trim();

    if (name === "") return;

    const newTask = {
      name,
      checked: false,
      addedTimestamp: Date.now(),
      statusUpdateTimestamp: null,
    };

    setTasks((prev) => [...prev, newTask]);
    input.value = ""; // Clear input
  };

  // Toggle task check/uncheck
  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index
          ? {
              ...task,
              checked: !task.checked,
              statusUpdateTimestamp: Date.now(),
            }
          : task
      )
    );
  };

  return (
    <PageContent pageTitle="To Do List">
      {/* Page Subtitle */}
      <p>Manage your current and upcoming tasks here.</p>

      {/* Todo Form */}
      <form id="task-form" onSubmit={addTask}>
        <input type="text" id="task" name="task" placeholder="Enter a task..." />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <div id="task-list">
        {tasks.length === 0 && (
          <p style={{ marginTop: "20px" }}>No tasks yet. Add one above!</p>
        )}

        {tasks.map((task, index) => (
          <div
            key={index}
            className="task-item"
            style={{
              textDecoration: task.checked ? "line-through" : "none",
              color: task.checked ? "gray" : "black",
              opacity: task.checked ? 0.7 : 1,
            }}
          >
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.checked}
              onChange={() => toggleTask(index)}
            />
            <span className="task-name">{task.name}</span>
          </div>
        ))}
      </div>
    </PageContent>
  );
};

export default ToDo;
