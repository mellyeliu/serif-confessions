import React, { createContext, useState, useContext, useEffect } from 'react';
import { generateCookie, getCookie } from '../helper';
import { createClient } from "@supabase/supabase-js";

const DataContext = createContext();


const SUPABASE_URL = "https://kovldxcnymhyquwknlln.supabase.co"
const supabase = createClient(SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvdmxkeGNueW1oeXF1d2tubGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNTUyNjgsImV4cCI6MjAyODczMTI2OH0.DH6euAm3PP4dFjKLCw2dWwA_A7hAzEzyw_LBfsM46x8");


export const DataProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  const [confessions, setConfessions] = useState(null);
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
    getCurrentPrompt().then((prompt) => {
      getCurrentConfessions(prompt, currentVisitorId);
    })
  }, [hasSubmittedToday]);

  async function getCurrentPrompt() {
    let { data: prompts, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('date', date);

      if (error) {
        console.error('Error fetching prompts:', error);
      } else if (prompts.length > 0) {
        setPrompt(prompts[0]);
      }
    return prompts[0]
  }

  async function getImageUrls(confessionId) {
    try {
        const {data} = await supabase.storage.from('confessions-images').list(confessionId);
        // Map over the images array to construct the full URLs
        // Idk why sometimes the images upload as plain text instead of png, so we also just check that the file extension is png
        const imageUrls = data.filter(item => item.metadata.mimetype === "image/png" || item.name.endsWith('.png')).map(image => {
            return `${SUPABASE_URL}/storage/v1/object/public/confessions-images/${confessionId}/${image.name}`
        });
        return imageUrls;
    } catch (error) {
        console.error('Failed to fetch images:', error);
        return [];
    }
}

  async function getCurrentConfessions(prompt, visitorId) {
    try {
      const { data: confessionsData, error } = await supabase
        .from("confessions")
        .select('*')
        .eq('prompt_id', prompt.id)
        .order('id', { ascending: false });

      const currentUserConfession = confessionsData.filter(confession => confession.user_id === visitorId);
      const fullAssetConfessions = confessionsData.filter(confession => confession.audio_url !== null);
      const confessionsToDisplay = fullAssetConfessions; 
      if (currentUserConfession.length > 0) {
        setHasSubmittedToday(true);
      }
      if (error) {
        throw error;
      }
      // Array to hold confessions with their images
      const confessionsWithImages = [];

      // Loop through each confession to fetch its associated image
      for (const confession of confessionsToDisplay) {
          confessionsWithImages.push({ ...confession, image_urls: await getImageUrls(confession.id) });  // Add confession without image on error
      }

      // Update state or handle the combined data
      setConfessions(confessionsWithImages);
    } catch (fetchError) {
      console.error('Error fetching confessions:', fetchError);
    }
  }

  const value = { date, confessions, prompt, setDate, setConfessions, setPrompt, addConfession, visitorId, setVisitorId, hasSubmittedToday, setHasSubmittedToday };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
