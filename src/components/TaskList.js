import React, { useState } from 'react';
import { db } from '../firebase';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';

const categoryClassNames = {
  'ux': 'card-ux',
  'dev frontend': 'card-dev-frontend',
  'dev backend': 'card-dev-backend',
  'design': 'card-design',
  'testing': 'card-testing'
};

const buttonClassNames = {
  'ux': 'btn-ux',
  'dev frontend': 'btn-dev-frontend',
  'dev backend': 'btn-dev-backend',
  'design': 'btn-design',
  'testing': 'btn-testing'
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
  const [alertMessage, setAlertMessage] = useState('');
  const [assignees, setAssignees] = useState({});
  const [assigneeErrors, setAssigneeErrors] = useState({});

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
    }, 3000); 
  };

  const handleAssigneeChange = (id, value) => {
    setAssignees((prev) => ({ ...prev, [id]: value }));
    setAssigneeErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const assignTask = async (id) => {
    const assignee = assignees[id];
    if (!assignee) {
      setAssigneeErrors((prev) => ({ ...prev, [id]: "Please assign the task to someone before proceeding." }));
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
      setError("Error assigning task: " + error.message);
    }
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
      setError("Error marking task as done: " + error.message);
    }
  };

  const removeTask = async (id) => {
    try {
      if (window.confirm("Are you sure you want to remove this task?")) {
        const taskDoc = doc(db, 'assignments', id);
        await deleteDoc(taskDoc);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        setError(null);
      }
    } catch (error) {
      setError("Error removing task: " + error.message);
    }
  };

  const renderTasks = (status, statusTitle) => {
    return (
      <div className="task-column">
        <h2 className="column-header">{statusTitle}</h2>
        {tasks.filter(task => task.status === status).map(task => {
          const assignee = assignees[task.id] || '';
          const assigneeError = assigneeErrors[task.id] || '';
          return (
            <div key={task.id} className={`card mb-3 ${categoryClassNames[task.category]}`}>
              <div className="card-body">
                <div className={`category-tag ${categoryTagClassNames[task.category]}`}>{task.category}</div>
                <h5 className="card-title">{task.assignment}</h5>
                <p className="card-text">Assigned to: {task.assigned}</p>
                {status === 'to do' && (
                  <div>
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter name"
                        value={assignee}
                        onChange={(e) => handleAssigneeChange(task.id, e.target.value)}
                      />
                      {assigneeError && <div className="custom-tooltip">{assigneeError}</div>}
                    </div>
                    <button className={`btn w-100 ${buttonClassNames[task.category]}`} onClick={() => assignTask(task.id)}>Assign</button>
                  </div>
                )}
                {status === 'in progress' && (
                  <button className={`btn w-100 btn-done`} onClick={() => markAsDone(task.id)}>Done</button>
                )}
                {status === 'done' && (
                  <button className={`btn w-100 btn-remove`} onClick={() => removeTask(task.id)}>Remove</button>
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
      {alertMessage && <div className="custom-alert">{alertMessage}</div>}
      <div className="row">
        {renderTasks('to do', 'To Do')}
        {renderTasks('in progress', 'In Progress')}
        {renderTasks('done', 'Done')}
      </div>
    </div>
  );
};

export default TaskList;
