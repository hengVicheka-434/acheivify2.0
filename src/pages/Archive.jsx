import React, { useState, useEffect, useMemo } from 'react';
import PageContent from '../components/PageContent';
import LoadingComponent from '../components/LoadingComponent';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import '../styles/App.css';

//dummy test data
const testData = [
    {
        name: 'Task 1',
        status: 'Completed',
        timeAdded: '2024-01-01 10:00 AM',
        priority: 'High',
        timeCompleted: '2024-01-01 12:00 PM'
    }
];

// handle delete history from local storage
const handleDeleteArchivedHistory = (id, setArchivedData) => {
    const storedTasks = JSON.parse(localStorage.getItem('taskListData')) || [];
    const updatedTasks = storedTasks.filter((_, index) => index !== id);
    localStorage.setItem('taskListData', JSON.stringify(updatedTasks));
    setArchivedData(updatedTasks);
};

const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

const Archive = () => {
    const [archivedData, setArchivedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Fetch history data from local storage
        const storedTasks = JSON.parse(localStorage.getItem('taskListData')) || [];
        // get only archived tasks from status completed more than one day ago
        setArchivedData(
            storedTasks.filter(task =>
                task.status === 'Completed' &&
                task.timeCompleted &&
                new Date(task.timeCompleted).getTime() < oneDayAgo
            ) || testData
        );
        setLoading(false);
    }, []);

    // Inline search + filter utilities (kept here inside the page as requested)
    const matchQuery = (task, query) => {
        if (!query || query.trim() === '') return true;
        const q = String(query).toLowerCase();
        if ((task.name || '').toLowerCase().includes(q)) return true;
        if ((task.status || '').toLowerCase().includes(q)) return true;
        if ((task.priority || '').toLowerCase().includes(q)) return true;
        if ((task.timeAdded || '').toLowerCase().includes(q)) return true;
        if ((task.timeCompleted || '').toLowerCase().includes(q)) return true;
        return false;
    };

    const applyFilter = (items, filterKey) => {
        if (!filterKey || filterKey === 'all') return items;
        const key = String(filterKey).toLowerCase();
        if (key === 'high-priority') return items.filter(i => String(i.priority || '').toLowerCase().includes('high'));
        if (key === 'medium-priority') return items.filter(i => String(i.priority || '').toLowerCase().includes('medium'));
        if (key === 'low-priority') return items.filter(i => String(i.priority || '').toLowerCase().includes('low'));
        return items;
    };

    // Derived visible data based on searchTerm and filter
    const visibleData = useMemo(() => {
        const filtered = archivedData.filter(item => matchQuery(item, searchTerm));
        return applyFilter(filtered, filter);
    }, [archivedData, searchTerm, filter]);

    return (
        <PageContent pageTitle="Archived Tasks">
            <p style={{ fontSize: '12px' }} >Only tasks completed more than one day ago are shown here.</p>
            <LoadingComponent isLoading={loading} >
                <div className='search-filter-wrapper'>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Filter filter={filter} setFilter={setFilter} />
                </div>
                { visibleData.length === 0 ? <p style={{ fontSize: '12px' }}>No history available.</p> : (
                    <table id="taskTable" className='table-text'>
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Status</th>
                                <th>Time Added</th>
                                <th>Priority</th>
                                <th>Time Completed</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleData.map((task, idx) => {
                                // find original index in the stored historyData so delete still works
                                const originalIndex = archivedData.findIndex(h => h === task);
                                const deleteIndex = originalIndex >= 0 ? originalIndex : idx;
                                return (
                                    <tr key={idx}>
                                        <td>{task.name}</td>
                                        <td>{task.status}</td>
                                        <td>{task.timeAdded}</td>
                                        <td className={`priority ${String(task.priority).toLowerCase()}`}>{task.priority}</td>
                                        <td>{task.timeCompleted}</td>
                                        <td>
                                            <button className="delete-button" onClick={() => handleDeleteArchivedHistory(deleteIndex, setArchivedData)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </LoadingComponent>
        </PageContent>
    );
};

export default Archive;