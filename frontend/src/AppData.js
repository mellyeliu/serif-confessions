import React, {useEffect, useState} from 'react';
import './App.css';
import StoryHome from './Components/StoryHome';
import StoryList from './Components/StoryList';
import StoryCardFullWrapper from './Components/StoryCardFullWrapper';
import './Fonts/Fonts.css';
import './PageLayout.css';
import NavHeader from './Components/NavHeader';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DataProvider, useData } from './Components/DataContext';
import { set } from 'date-fns';

function AppData() {
  const { prompt, confessions } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (confessions!== null) {
      setLoading(false)
    }
  }, [confessions, setLoading]);

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
          {loading ? 
          <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> :
          (<Routes>
            <Route path="/" element={<StoryList confessions={confessions ?? []} />} />
            <Route path="/card/:id" element={<StoryCardFullWrapper />} />
          </Routes>)
          }
          <Footer />
        </div>
      </motion.div>
      </DataProvider>
    </Router>
  );
}

export default AppData;
