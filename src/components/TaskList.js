import React, { useState } from 'react';
import { db } from '../firebase';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import '../App.css'; 

const categoryClassNames = {
  'ux': 'card-ux',
  'dev frontend': 'card-dev-frontend',
  'dev backend': 'card-dev-backend',
  'design': 'card-design',
  'testing': 'card-testing'
};

const categoryTagClassNames = {
  'ux': 'tag-ux',
  'dev frontend': 'tag-dev-frontend',
  'dev backend': 'tag-dev-backend',
  'design': 'tag-design',
  'testing': 'tag-testing'
};

const TaskList = ({ tasks, setTasks, loading }) => {
  const [error, setError] = useState(null);
  const [assignees, setAssignees] = useState({});
  const [assigneeErrors, setAssigneeErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleAssigneeChange = (id, value) => {
    setAssignees((prev) => ({ ...prev, [id]: value }));
    setAssigneeErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const assignTask = async (id) => {
    const assignee = assignees[id];
    if (!assignee) {
      setAssigneeErrors((prev) => ({ ...prev, [id]: '' }));
      return;
    }

    try {
      const taskDoc = doc(db, 'assignments', id);
      await updateDoc(taskDoc, { assigned: assignee, status: 'in progress' });
      setTasks(prevTasks => prevTasks.map(task =>
        task.id === id ? { ...task, assigned: assignee, status: 'in progress' } : task
      ));
      setAssignees((prev) => ({ ...prev, [id]: '' }));
      setAssigneeErrors((prev) => ({ ...prev, [id]: '' }));
      setError(null);
    } catch (error) {
      setError('Error assigning task: ' + error.message);
    }
  };

  const handleAssignSubmit = (e, id) => {
    e.preventDefault();
    assignTask(id);
  };

  const markAsDone = async (id) => {
    try {
      const taskDoc = doc(db, 'assignments', id);
      await updateDoc(taskDoc, { status: 'done' });
      setTasks(prevTasks => prevTasks.map(task =>
        task.id === id ? { ...task, status: 'done' } : task
      ));
      setError(null);
    } catch (error) {
      setError('Error marking task as done: ' + error.message);
    }
  };

  const handleRemoveClick = (id) => {
    setTaskToDelete(id);
  };

  const confirmRemoveTask = async () => {
    try {
      const taskDoc = doc(db, 'assignments', taskToDelete);
      await deleteDoc(taskDoc);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete));
      setError(null);
      setToastMessage('Task successfully removed');
      setTimeout(() => setToastMessage(''), 1000); 
      setTaskToDelete(null);
    } catch (error) {
      setError('Error removing task: ' + error.message);
    }
  };

  const cancelRemoveTask = () => {
    setTaskToDelete(null);
  };

  const moveTask = (id, direction) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return;

    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(taskIndex, 1);

    if (direction === 'up' && taskIndex > 0) {
      newTasks.splice(taskIndex - 1, 0, movedTask);
    } else if (direction === 'down' && taskIndex < tasks.length - 1) {
      newTasks.splice(taskIndex + 1, 0, movedTask);
    }

    setTasks(newTasks);
  };

  const renderTasks = (status, statusTitle) => {
    const tasksByStatus = tasks.filter(task => task.status === status);
  
    return (
      <div className="task-column">
        <h2 className="column-header">{statusTitle}</h2>
        {tasksByStatus.map((task, index) => {
          const assignee = assignees[task.id] || '';
          const assigneeError = assigneeErrors[task.id] || '';
          return (
            <div key={task.id} className={`card mb-3 ${categoryClassNames[task.category]}`}>
              <div className="card-body">
                <div className={`category-tag ${categoryTagClassNames[task.category]}`}>{task.category}</div>
                <h5 className="card-title">{task.assignment}</h5>
                <p className="card-text">Assigned to: {task.assigned}</p>
                {status === 'to do' && (
                  <form onSubmit={(e) => handleAssignSubmit(e, task.id)}>
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter name"
                        value={assignee}
                        onChange={(e) => handleAssigneeChange(task.id, e.target.value)}
                        required
                      />
                      {assigneeError && <div className="custom-tooltip">{assigneeError}</div>}
                    </div>
                    <button type="submit" className="btn w-100">Assign</button>
                  </form>
                )}
                {status === 'in progress' && (
                  <button className="btn w-100 btn-done" onClick={() => markAsDone(task.id)}>Done</button>
                )}
                {status === 'done' && (
                  <button className="btn w-100 btn-remove" onClick={() => handleRemoveClick(task.id)}>Remove</button>
                )}
                {(status === 'to do' || status === 'in progress') && tasksByStatus.length > 1 && (
                  <div className="move-buttons">
                    {index > 0 && <button className="move-button" onClick={() => moveTask(task.id, 'up')}>&#x25B2;</button>}
                    {index < tasksByStatus.length - 1 && <button className="move-button" onClick={() => moveTask(task.id, 'down')}>&#x25BC;</button>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };  

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="container">
      {error && <p className="text-danger mt-3">{error}</p>}
      {toastMessage && <div className="toast-message">{toastMessage}</div>}
      <div className="row">
        {renderTasks('to do', 'To Do')}
        {renderTasks('in progress', 'In Progress')}
        {renderTasks('done', 'Done')}
      </div>
      {taskToDelete !== null && (
        <div className="confirm-popup">
          <p>Are you sure you want to remove this task?</p>
          <button onClick={confirmRemoveTask}>Yes</button>
          <button onClick={cancelRemoveTask}>No</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
