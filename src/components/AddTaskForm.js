import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const categoryClassNames = {
  'ux': 'option-ux',
  'design': 'option-design',
  'testing': 'option-testing',
  'dev backend': 'option-dev-backend',
  'dev frontend': 'option-dev-frontend',
};

const AddTaskForm = ({ onTaskAdded }) => {
  const [assignment, setAssignment] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'assignments'), {
        assignment,
        category,
        status: 'to do',
        assigned: 'none'
      });
      onTaskAdded({ id: docRef.id, assignment, category, status: 'to do', assigned: 'none' });
      setAssignment('');
      setCategory('');
      setError(null);
    } catch (error) {
      setError("Error adding document: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-container mb-4">
      <input
        type="text"
        className="form-control task-input"
        placeholder="Assignment"
        value={assignment}
        onChange={(e) => setAssignment(e.target.value)}
        required
      />
      <select
        className="form-select task-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" className="option-default">Select Category</option>
        {Object.keys(categoryClassNames).map(cat => (
          <option key={cat} value={cat} className={categoryClassNames[cat]}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <button type="submit" className="btn add-task-button">Add Task</button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </form>
  );
};

export default AddTaskForm;