import React from 'react';
import './App.css';
import Table from './Components/Table';
import Filters from './Components/Filters';
import JointFilters from './Components/JointFilters';

function App() {
  return (
    <div>
      <Filters />
      <JointFilters />
      <Table />
    </div>
  );
}

export default App;
