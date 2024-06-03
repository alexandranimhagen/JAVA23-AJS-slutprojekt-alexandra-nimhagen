// src/components/TaskList.js
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

const TaskList = ({ tasks, setTasks, loading }) => {
  const [assignee, setAssignee] = useState('');
  const [error, setError] = useState(null);

  const assignTask = async (id) => {
    try {
      const taskDoc = doc(db, 'assignments', id);
      await updateDoc(taskDoc, { assigned: assignee, status: 'in progress' });
      setTasks(prevTasks => prevTasks.map(task => 
        task.id === id ? { ...task, assigned: assignee, status: 'in progress' } : task
      ));
      setAssignee('');
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

  const renderTasks = (status) => {
    return tasks.filter(task => task.status === status).map(task => (
      <div key={task.id} className={`card mb-3 ${categoryClassNames[task.category]}`}>
        <div className="card-body">
          <button className="close btn-remove-task" onClick={() => removeTask(task.id)}>×</button>
          <h5 className="card-title">{task.assignment}</h5>
          <p className="card-text">Assigned to: {task.assigned}</p>
          {status === 'to do' && (
            <div>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Assign to"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
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
    ));
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="container">
      {error && <p className="text-danger mt-3">{error}</p>}
      <div className="row">
        <div className="col-md-4">
          <h2>To Do</h2>
          {renderTasks('to do')}
        </div>
        <div className="col-md-4">
          <h2>In Progress</h2>
          {renderTasks('in progress')}
        </div>
        <div className="col-md-4">
          <h2>Done</h2>
          {renderTasks('done')}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
