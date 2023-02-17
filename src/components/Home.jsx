import React from "react";
import { Box, Link, Typography } from '@mui/material';
import CommunityVoices from "./CommunityVoices";
import { LoadScript } from "@react-google-maps/api";

import MapView from "./MapView";
import HomeTable from "./HomeTable";
import NOIsTable from "./NOIsTable";


const lib = ["places"];
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;



const Loading = <div background-color="#FFAAAA" />

const Home = () => {

  return (
    <Box sx={{display: "flex"}}>
      <CommunityVoices />

      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1}}>
        
        <Typography sx={{mt: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
          Find Nearby Pesticides
        </Typography>

        <LoadScript 
          googleMapsApiKey={key} 
          libraries={lib}
          loadingElement={Loading}>
          <MapView />
        </LoadScript>

        <Box sx={{m: "30px", display: "flex", justifyContent: "space-between", width: "80%" }}>
          <Typography sx={{ fontSize: 21, fontWeight: 600, color: "#126701" }}>
            Notices of Intent
          </Typography>

          <Link href="/NOIs" underline="hover" sx={{ pt: "5px", component: "button", color: "#208EF3", fontSize: 18, fontWeight: 600}}>
            See All
          </Link>
        </Box>

        <NOIsTable/>
      </Box>
    </Box>
  );
};

export default Home;