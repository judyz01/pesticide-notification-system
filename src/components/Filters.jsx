import React from "react";

import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

import { CountyFilter, DateDistanceFilter, FumigantFilter, RadiusFilter } from './filter';


const Filters = (props) => {
  const { t } = useTranslation();

  const get_county = (county) => {
    props.set_county(county);
  }

  const get_order = (order) => {
    props.set_order(order);
  }

  const get_fumigant = (fumigant) => {
    props.set_fumigant(fumigant);
  }

  const get_radius = (radius) => {
    props.set_radius(radius);
  }

  console.log(props.currentRadius);
  console.log(props.currentOrder);

  return (
    // TODO: Implement filters for mobile view
    // <Box sx={{display:{xs: "none", sm: "block"}, backgroundColor: "#EAEAEA", width: "20%", minWidth: "150px" }}>
    <Box sx={{display: "block", direction: "column", backgroundColor: "#EAEAEA", width:{md: "100%", lg: "20%"}, height:{lg:"auto"}}}>
    
      <Typography align='center' sx={{pt: "45px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
        {t("Filters")}
      </Typography>

      <Stack direction="column" alignItems="left" spacing={5} sx={{ pl: "15%", pr: "15%", pt: "30px"}}>

        <RadiusFilter 
          func={get_radius}
          currentRadius={props.currentRadius}
        />
        <CountyFilter 
          func={get_county}
          currentCounty={props.currentCounty}
        />
        <DateDistanceFilter 
          func={get_order}
          currentOrder={props.currentOrder}
        />
        <FumigantFilter 
          func={get_fumigant}
          currentFumigant={props.currentFumigant}
        />

      </Stack>
    </Box>
  );
};

export default Filters;

