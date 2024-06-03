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

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'assignments'));
      setTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = async () => {
    if (!assignment) {
      window.alert("Assignment field cannot be empty");
      return;
    }
    if (!category) {
      window.alert("Please select a category");
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
        <input
          type="text"
          className="form-control task-input"
          placeholder="Assignment"
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
        />
        <select
          className="form-select task-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" className="option-default">Select Category</option>
          {Object.keys(categoryClassNames).map(cat => (
            <option key={cat} value={cat} className={categoryClassNames[cat]}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <button className="btn add-task-button" onClick={handleTaskAdded}>Add Task</button>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} loading={loading} />
    </div>
  );
}

export default App;
