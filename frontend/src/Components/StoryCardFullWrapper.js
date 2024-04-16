import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoryCard from './StoryCard';
import { createClient } from "@supabase/supabase-js";

// Wrapper component that could also receive additional global or context props


const StoryCardFullWrapper = ({ confessions }) => {

    const { id } = useParams();

    const confession = confessions.find(confession => {
        console.log("helloo", confession.id);
        console.log(confession.id === id);
        return confession.id === Number(id);
    }) || {
        created_at: new Date(),
        text: "No confession found :/",
        id: 0,
    };

    // You can now pass both the `id` and other props to the CardDetail component
    return <StoryCard full={true} {...confession} />;
};

export default StoryCardFullWrapper;
