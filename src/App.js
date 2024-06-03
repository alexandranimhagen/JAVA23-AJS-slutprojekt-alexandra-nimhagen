import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'assignments'));
      setTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div className="container">
      <h1 className="my-4">Scrum Board</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} setTasks={setTasks} loading={loading} />
    </div>
  );
}

export default App;
