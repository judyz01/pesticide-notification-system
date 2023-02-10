import React from "react";
import { Box } from '@mui/material';
import CommunityVoices from "./CommunityVoices";



const Home = () => {
  return (
    <Box sx={{display: "flex",  height: "100vh", width: "100vw"}}>
      <CommunityVoices />

      <Box sx={{backgroundColor: "#fdf7ee", flexGrow: 1}}>
        HOME PAGE
      </Box>
    </Box>
  );
};

export default Home;