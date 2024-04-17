import React, { useState, useEffect } from 'react';

import '../PageLayout.css';
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import StoryCard from './StoryCard';




const supabase = createClient("https://kovldxcnymhyquwknlln.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvdmxkeGNueW1oeXF1d2tubGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNTUyNjgsImV4cCI6MjAyODczMTI2OH0.DH6euAm3PP4dFjKLCw2dWwA_A7hAzEzyw_LBfsM46x8");

const StoryCardFullWrapper = () => {
  const today = new Date()

  const [currentPrompt, setCurrentPrompt] = useState([]);
  const [confessions, setConfessions] = useState([]);
  const [confession, setConfession] = useState({
    created_at: new Date(),
    text: "No confession found :/",
    id: 0,
});
  useEffect(() => {
    getCurrentPrompt();
  }, []);

  useEffect(() => {
    if (currentPrompt) {
      getCurrentConfessions();
    }
  }, [currentPrompt]);

  useEffect(() => {
    if (confessions) {
        getConfessionFromId(confessions);
    }
  }, [confessions]);

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

  const { id } = useParams();

async function getConfessionFromId(confessions) {

    const conf = confessions.find(confession => {
        return confession.id == Number(id);
    }) || {
        created_at: new Date(),
        text: "No confession found :/",
        id: 0,
    };

    setConfession(conf);
}



    return <StoryCard full={true} audio_file="../audio/confession2.wav" id={id} {...confession} />;
}

export default StoryCardFullWrapper;
