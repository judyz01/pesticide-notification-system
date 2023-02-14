import React from "react";
import { Box, Typography } from '@mui/material';
import CommunityVoices from "./CommunityVoices";
import { LoadScript } from "@react-google-maps/api";

import MapView from "./MapView";

const lib = ["places"];
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Home = () => {
  return (
    <Box sx={{display: "flex"}}>
      <CommunityVoices />

      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1, height: "100vh"}}>
        
        <Typography sx={{mt: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
          Find Nearby Pesticides
        </Typography>
        <LoadScript googleMapsApiKey={key} libraries={lib}>
          <MapView />
        </LoadScript>
      </Box>
    </Box>
  );
};

export default Home;