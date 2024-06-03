import React from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default HomePage;
