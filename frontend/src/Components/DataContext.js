import React, { createContext, useState, useContext } from 'react';
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  const [confessions, setConfessions] = useState([]);
  const [prompt, setPrompt] = useState({});
  const [visitorId, setVisitorId] = useState({})
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false)
  const addConfession = confession => setConfessions(prev => [...prev, confession]);

  const value = { date, confessions, prompt, setDate, setConfessions, setPrompt, addConfession, visitorId, setVisitorId, hasSubmittedToday, setHasSubmittedToday };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
