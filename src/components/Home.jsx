import React from "react";

import { Box, Link, Stack, Typography } from '@mui/material';
import { LoadScript } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import {Link as RouterLink} from "react-router-dom";
import { MapDistanceFilter, RadiusFilter } from './filter';


import { RefactoredMapView, NOICards } from './';

import HomePanel from "./HomePanel";

const lib = ["places"];
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Loading = <div background-color="#FFAAAA" />

const Home = (props) => {
  const { t } = useTranslation();

  const [location, setLocation] = React.useState();
  const [distanceFilter, setDistanceFilter] = React.useState('Closest');
  const [radius, setRadius] = React.useState(5);

  const get_location = (location) => {
    // Passed to App to pass to NOIs
    props.set_location(location);

    // Passes to NOICards component below as it's also listed on home page
    setLocation(location);
  }

  const get_distance_order = (order) => {
    // Passes to NOICards component below as it's also listed on home page
    setDistanceFilter(order);
  }

  const get_radius = (radius) => {
    setRadius(radius);
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
          <RefactoredMapView func={get_location} radius={radius} lat={props.lat} lng={props.lng}/>

        </LoadScript>

        
        <Box sx={{m: "15px", pt: "60px", display: "flex", justifyContent: "space-between", width: "80%" }}>
          <Typography sx={{ pt: "15px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
            {t("NOI")}
          </Typography>

          <Link to="/Archive" underline="hover" component={RouterLink} sx={{ pt: "15px", component: "button", color: "#208EF3", fontSize: 18, fontWeight: 600}}>
            {t("SeeAll")}
          </Link>

        </Box>

        <Stack direction="row" spacing={2} sx={{width: "80%", mb:"15px"}}>

          <RadiusFilter
            func={get_radius}
            radius={radius}
          />

          <MapDistanceFilter
            func={get_distance_order}
            distanceOrder={distanceFilter}
          />

        </Stack>

        <NOICards location={location} distance_order={distanceFilter} radius={radius}/>
      </Box>
    </Box>
  );
};

export default Home;