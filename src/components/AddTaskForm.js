import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const categoryClassNames = {
  'ux': 'option-ux',
  'dev frontend': 'option-dev-frontend',
  'dev backend': 'option-dev-backend',
  'design': 'option-design',
  'testing': 'option-testing'
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
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Assignment"
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <select
          className="form-select"
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
      </div>
      <button type="submit" className="btn btn-add-task w-100">Add Task</button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </form>
  );
};

export default AddTaskForm;
