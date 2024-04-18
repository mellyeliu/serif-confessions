import React from 'react';
import './App.css';
import AppData from './AppData';
import { DataProvider } from './Components/DataContext';

function App() {
  return (
      <DataProvider>
        <AppData />
      </DataProvider>
  );
}

export default App;
