import React, { useState } from 'react';
import { db } from '../firebase';

const AddTaskForm = () => {
  const [assignment, setAssignment] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.collection('assignments').add({
      assignment,
      category,
      status: 'to do',
      assigned: 'none',
    });
    setAssignment('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={assignment}
        onChange={(e) => setAssignment(e.target.value)}
        placeholder="Assignment"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
