import React, { useState, useEffect } from "react";
import PageContent from "../components/PageContent";

const ToDo = () => {
  const localStorageKey = "taskListData";
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      // filter out tasks completed more than one day ago
      const filtered = parsed.filter(
        (t) =>
          !(t.checked && now - (t.statusUpdateTimestamp || t.addedTimestamp) >= oneDay)
      );

      setTasks(filtered);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    const savedTasks = tasks.map((t) => ({
      name: t.name,
      checked: t.checked,
      addedTimestamp: t.addedTimestamp,
      statusUpdateTimestamp: t.statusUpdateTimestamp || null,
    }));

    localStorage.setItem(localStorageKey, JSON.stringify(savedTasks));
  }, [tasks]);


  // Add new task when pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const name = inputValue.trim();
      if (name === "") return;

      const timestamp = Date.now();

      const newTask = {
        name,
        checked: false,
        addedTimestamp: timestamp,
        statusUpdateTimestamp: null,
      };

      setTasks((prev) => [...prev, newTask]);
      setInputValue("");
    }
  };

  // Toggle checkbox status and update statusUpdateTimestamp
  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index
          ? { ...t, checked: !t.checked, statusUpdateTimestamp: Date.now() }
          : t
      )
    );
  };

  return (
    <PageContent pageTitle="To Do List">
      <p>Manage your current and upcoming tasks here.</p>

      <div id="task-list">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="task-item"
            style={{
              textDecoration: task.checked ? "line-through" : "none",
              color: task.checked ? "gray" : "black",
              opacity: task.checked ? 0.7 : 1,
            }}
            data-added-timestamp={task.addedTimestamp}
            data-status-update-timestamp={task.statusUpdateTimestamp || ""}
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

      <form id="task-form" onSubmit={(e) => e.preventDefault()}>
        <input type="checkbox" disabled />

        <input
          type="text"
          id="task"
          name="task"
          placeholder="Add A New Task . . ."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </PageContent>
  );
};

export default ToDo;
