import React, { useState, useEffect, useRef } from "react";
import PageContent from "../components/PageContent";

const ToDo = () => {
  const localStorageKey = "taskListData";
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const isInitialMount = useRef(true);
  const [editingIndex, setEditingIndex] = useState(null); // editing state
  const [editingValue, setEditingValue] = useState(""); // editing text

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
          !(t.status && now - (t.statusUpdateTimestamp || t.addedTimestamp) >= oneDay)
      );

      // ensure old tasks without priority get default
      const withPriority = filtered.map((t) => ({
        ...t,
        priority: t.priority || "low",
      }));

      setTasks(withPriority);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    // Skip saving on the initial mount to avoid overwriting stored data
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const savedTasks = tasks.map((t) => ({
      name: t.name,
      status: t.status,
      priority: t.priority, // save priority
      addedTimestamp: t.addedTimestamp,
      statusUpdateTimestamp: t.statusUpdateTimestamp  || null
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
        status: false,
        priority: "low", // default priority (Low)
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
          ? { ...t, status: !t.status, statusUpdateTimestamp: Date.now() }
          : t
      )
    );
  };

  // Change priority
  const changePriority = (index, newPriority) => {
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, priority: newPriority } : t
      )
    );
  };

  // Start editing a task
  const startEditing = (index, currentName) => {
    setEditingIndex(index);
    setEditingValue(currentName);
  };

  // Save edited task (Enter)
  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const newName = editingValue.trim();
      if (newName === "") return;

      setTasks((prev) =>
        prev.map((t, i) =>
          i === index ? { ...t, name: newName } : t
        )
      );

      setEditingIndex(null);
      setEditingValue("");
    }

    if (e.key === "Escape") {
      setEditingIndex(null);
      setEditingValue("");
    }
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
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
              display: "flex",
              alignItems: "center",
            }}
            data-added-timestamp={task.addedTimestamp}
            data-status-update-timestamp={task.statusUpdateTimestamp || ""}
          >
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.status}
              onChange={() => toggleTask(index)}
            />
            {/* Edit mode */}
            {editingIndex === index ? (
              <input
                type="text"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                onKeyDown={(e) => handleEditKeyDown(e, index)}
                autoFocus
                style={{ fontSize: "24px", flex: 1 }}
              />
            ) : (
              <span
                className="task-name"
                style={{
                  textDecoration: task.status ? "line-through" : "none",
                  color: task.status ? "gray" : "black",
                  opacity: task.status ? 0.7 : 1,
                  marginRight: "12px",
                }}
              >
                {task.name}
              </span>
            )}

            {/* Priority dropdown */}
            <select
              value={task.priority}
              onChange={(e) => changePriority(index, e.target.value)}
              style={{
                marginRight: "12px",
                padding: "4px 6px",
                borderRadius: "6px",
                fontSize: "14px",
                textTransform: "capitalize",
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {/* Edit button */}
            <button
              onClick={() => startEditing(index, task.name)}
              style={{
                marginLeft: "auto",
                padding: "6px 12px",
                fontSize: "14px",
                borderRadius: "6px",
                border: "1px solid #007bff",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            {/* Delete button */}
            <button
              onClick={() => deleteTask(index)}
              style={{
                marginLeft: "8px",
                padding: "6px 12px",
                fontSize: "14px",
                borderRadius: "6px",
                border: "1px solid #dc3545",
                backgroundColor: "#dc3545",
                color: "white",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
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