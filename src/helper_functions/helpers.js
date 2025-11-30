export function formatTimestamp(timestamp) {
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
        return "--";
    }
    const date = new Date(timestamp);
    return date.toLocaleString();
}

export function handleDeleteRow(id, setHistoryData) {
    const storedTasks = JSON.parse(localStorage.getItem('taskListData')) || [];
    const updatedTasks = storedTasks.filter((_, index) => index !== id);
    localStorage.setItem('taskListData', JSON.stringify(updatedTasks));
    setHistoryData(updatedTasks);
}

