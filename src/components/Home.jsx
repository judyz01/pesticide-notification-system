import React from "react";

import { Box, Link, Stack, Typography } from '@mui/material';
import { LoadScript } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import {Link as RouterLink} from "react-router-dom";

import { RefactoredMapView, NOICards } from './';

import HomePanel from "./HomePanel";

import { DateDistanceFilter, RadiusFilter } from './filter';

const lib = ["places"];
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Loading = <div background-color="#FFAAAA" />

const Home = (props) => {
  const { t } = useTranslation();

  const [location, setLocation] = React.useState();

  const get_location = (location) => {
    // Passed to App to pass to NOIs
    props.set_location(location);

    // Passes to NOICards component below as it's also listed on home page
    setLocation(location);
  }


  return (
    <Box sx={{display: "flex"}}>
      <HomePanel />

      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1}}>
        

        <Typography align="center" sx={{mt: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
            {t("Title")}
        </Typography>

        <LoadScript 
          googleMapsApiKey={key} 
          libraries={lib}
          loadingElement={Loading}>
          <RefactoredMapView func={get_location} lat={props.lat} lng={props.lng}/>

        </LoadScript>

        
        <Box sx={{m: "30px", pt: "60px", display: "flex", justifyContent: "space-between", width: "80%" }}>
          <Typography sx={{ pt: "15px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
            {t("NOI")}
          </Typography>

          <Link to="/Archive" underline="hover" component={RouterLink} sx={{ pt: "15px", component: "button", color: "#208EF3", fontSize: 18, fontWeight: 600}}>
            {t("SeeAll")}
          </Link>

        </Box>

        <NOICards location={location}/>
      </Box>
    </Box>
  );
};

export default Home;