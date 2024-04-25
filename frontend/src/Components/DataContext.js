import React, { createContext, useState, useContext, useEffect } from 'react';
import { generateCookie, getCookie } from '../helper';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  const [confessions, setConfessions] = useState([]);
  const [prompt, setPrompt] = useState({});
  const [visitorId, setVisitorId] = useState({})
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false)
  const addConfession = confession => setConfessions(prev => [...prev, confession]);

  useEffect(() => {
    let currentVisitorId = getCookie("serif-unique-visitor-id")
    if (currentVisitorId == "") {
      currentVisitorId = generateCookie("serif-unique-visitor-id")
    }
    setVisitorId(currentVisitorId)
  }, []);
  
  const value = { date, confessions, prompt, setDate, setConfessions, setPrompt, addConfession, visitorId, setVisitorId, hasSubmittedToday, setHasSubmittedToday };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
