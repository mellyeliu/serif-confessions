import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import StoryHome from './Components/StoryHome';
import StoryList from './Components/StoryList';
import './Fonts/Fonts.css';
import './PageLayout.css';
import NavHeader from './Components/NavHeader';
import { createClient } from "@supabase/supabase-js";


const supabase = createClient("https://kovldxcnymhyquwknlln.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvdmxkeGNueW1oeXF1d2tubGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNTUyNjgsImV4cCI6MjAyODczMTI2OH0.DH6euAm3PP4dFjKLCw2dWwA_A7hAzEzyw_LBfsM46x8");

function App() {
  const today = new Date()
  
  const [currentPrompt, setCurrentPrompt] = useState([]);
  const [confessions, setConfessions] = useState([]);
  useEffect(() => {
    getCurrentPrompt();
  }, []);

  useEffect(() => {
    if (currentPrompt){
      getCurrentConfessions();
    }
  }, [currentPrompt]);

  async function getCurrentPrompt() {
    let dateFilter = today.toISOString().split('T')[0];
    let { data: prompts, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('date', dateFilter);
    
    setCurrentPrompt(prompts[0]);
  }

  async function getCurrentConfessions() {
    const { data } = await supabase
    .from("confessions")
    .select('*')
    .eq('prompt_id', currentPrompt.id);
    setConfessions(data);
  }

  return (
    <div className="App">
      <NavHeader />
      <StoryHome prompt={currentPrompt ? currentPrompt.text : ""}/>
      <StoryList confessions={confessions ?? []}/>
      {/* <header className="App-header">

      </header> */}
    </div>
  );
}

export default App;
