import React from "react";
import { Box, Typography } from '@mui/material';
import CommunityVoices from "./CommunityVoices";
import MapView from "./MapView";



const Home = () => {
  return (
    <Box sx={{display: "flex"}}>
      <CommunityVoices />

      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1, height: "100vh"}}>
        
        <Typography sx={{mt: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
          Find Nearby Pesticides
        </Typography>

        <MapView />
      </Box>
    </Box>
  );
};

export default Home;