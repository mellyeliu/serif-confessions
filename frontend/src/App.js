import React, { useState, useEffect } from 'react';
import './App.css';
import AppData from './AppData';
import { DataProvider, useData } from './Components/DataContext';

function App() {
  return (
      <DataProvider>
        <AppData />
      </DataProvider>
  );
}

export default App;
