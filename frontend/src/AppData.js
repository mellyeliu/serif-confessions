import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import StoryHome from './Components/StoryHome';
import StoryList from './Components/StoryList';
import StoryCardFullWrapper from './Components/StoryCardFullWrapper';
import './Fonts/Fonts.css';
import './PageLayout.css';
import NavHeader from './Components/NavHeader';
import Footer from './Components/Footer';
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TestData } from './TestData';
import { DataProvider, useData } from './Components/DataContext';



const SUPABASE_URL = "https://kovldxcnymhyquwknlln.supabase.co"
const supabase = createClient(SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvdmxkeGNueW1oeXF1d2tubGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNTUyNjgsImV4cCI6MjAyODczMTI2OH0.DH6euAm3PP4dFjKLCw2dWwA_A7hAzEzyw_LBfsM46x8");

function AppData() {
  const today = new Date()
  const { prompt, date, setDate, setConfessions, setPrompt, confessions } = useData();

  useEffect(() => {
    getCurrentPrompt();
  }, []);

  useEffect(() => {
    if (prompt) {
      getCurrentConfessions();
    }
  }, [prompt]);

  async function getCurrentPrompt() {
    let dateFilter = today.toISOString().split('T')[0];
    let { data: prompts, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('date', dateFilter);

      if (error) {
        console.error('Error fetching prompts:', error);
      } else if (prompts.length > 0) {
        setPrompt(prompts[0]);
      }
  }

  async function getImageUrls(confessionId) {
    try {
        const {data} = await supabase.storage.from('confessions-images').list(confessionId);
        // Map over the images array to construct the full URLs
        const imageUrls = data.filter(item => item.metadata.mimetype === "image/png").map(image => {
            return `${SUPABASE_URL}/storage/v1/object/public/confessions-images/${confessionId}/${image.name}`
        });
        return imageUrls;
    } catch (error) {
        console.error('Failed to fetch images:', error);
        return [];
    }
}

  async function getCurrentConfessions() {
    try {
      const { data: confessionsData, error } = await supabase
        .from("confessions")
        .select('*')
        .eq('prompt_id', prompt.id);

      if (error) {
        throw error;
      }
      // Array to hold confessions with their images
      const confessionsWithImages = [];

      // Loop through each confession to fetch its associated image
      for (const confession of confessionsData) {
          confessionsWithImages.push({ ...confession, image_urls: await getImageUrls(confession.id) });  // Add confession without image on error
      }

      // Update state or handle the combined data
      setConfessions(confessionsWithImages);
    } catch (fetchError) {
      console.error('Error fetching confessions:', fetchError);
    }
  }

  return (
    <Router>
      <DataProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
      <div className="App">
          <div className="">
          <NavHeader />
          </div>
          <StoryHome prompt={prompt} />
          <Routes>
            <Route path="/" element={<StoryList confessions={confessions ?? []} />} />
            <Route path="/card/:id" element={<StoryCardFullWrapper />} />
          </Routes>
          {/* <StoryList confessions={confessions ?? []} /> */}
          <Footer />
        </div>
      </motion.div>
      </DataProvider>
    </Router>
  );
}

export default AppData;
