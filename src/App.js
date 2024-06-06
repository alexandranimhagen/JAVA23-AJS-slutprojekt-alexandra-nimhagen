import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import './App.css';

const categoryClassNames = {
  'ux': 'option-ux',
  'design': 'option-design',
  'testing': 'option-testing',
  'dev frontend': 'option-dev-frontend',
  'dev backend': 'option-dev-backend',
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState('');
  const [category, setCategory] = useState('');
  const [assignmentError, setAssignmentError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'assignments'));
      setTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (!assignment) {
      setAssignmentError("Assignment field cannot be empty");
      hasError = true;
    } else {
      setAssignmentError('');
    }

    if (!category) {
      setCategoryError("Please select a category");
      hasError = true;
    } else {
      setCategoryError('');
    }

    if (hasError) {
      return;
    }

    const newTask = {
      assignment,
      category,
      status: 'to do',
      assigned: 'none'
    };
    const docRef = await addDoc(collection(db, 'assignments'), newTask);
    setTasks(prevTasks => [...prevTasks, { id: docRef.id, ...newTask }]);
    setAssignment('');
    setCategory('');
  };

  return (
    <div className="container">
      <h1 className="my-4">Scrum Board</h1>
      <div className="add-task-container">
        <form onSubmit={handleTaskAdded} className="flex-container">
          <div className="input-container">
            <input
              type="text"
              className="form-control task-input"
              placeholder="Assignment"
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
              required
            />
            {assignmentError && <div className="custom-tooltip">{assignmentError}</div>}
          </div>
          <div className="input-container">
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
            {categoryError && <div className="custom-tooltip">{categoryError}</div>}
          </div>
          <button type="submit" className="btn add-task-button">Add Task</button>
        </form>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} loading={loading} />
    </div>
  );
}

export default App;
