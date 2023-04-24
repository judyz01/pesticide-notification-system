import React from "react";

import { Box, Link, Typography } from '@mui/material';
import { LoadScript } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import {Link as RouterLink} from "react-router-dom";

import { CommunityVoices, NOICards } from './';
import { RefactoredMapView } from './';


const lib = ["places"];
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Loading = <div background-color="#FFAAAA" />

const Home = (props) => {
  const { t } = useTranslation();

  const [location, setLocation] = React.useState();

  const get_location = (location) => {
    props.set_location(location);

    // Passes to NOICard component below as it's also listed on home page
    setLocation(location);
  }


  return (
    <Box sx={{display: "flex"}}>
      <CommunityVoices />

      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1}}>
        

        <Typography align="center" sx={{mt: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
            {t("Title")}
        </Typography>

        <LoadScript 
          googleMapsApiKey={key} 
          libraries={lib}
          loadingElement={Loading}>
          <RefactoredMapView func={get_location}/>

        </LoadScript>

        
        <Box sx={{m: "30px", pt: "60px", display: "flex", justifyContent: "space-between", width: "80%" }}>
          <Typography sx={{ pt: "15px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
            {t("NOI")}
          </Typography>

          <Link to="/NOIS" underline="hover" component={RouterLink} sx={{ pt: "15px", component: "button", color: "#208EF3", fontSize: 18, fontWeight: 600}}>
            {t("SeeAll")}
          </Link>

        </Box>

        <NOICards location={location}/>
      </Box>
    </Box>
  );
};

export default Home;