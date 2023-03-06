import * as React from "react";

import { Box, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

import { Filters, NOICards }from "./";

const NOIs = (props) => {
  const { t } = useTranslation();
  const NOI_SEARCH = t("NOISearch");

  const [county, setCounty] = React.useState([]);
  const [order, setOrder] = React.useState();
  const [fumigant, setFumigant] = React.useState();
  const [radius, setRadius] = React.useState();

  const set_county = (county) => {
    setCounty(county);
  }

  const set_order = (order) => {
    setOrder(order);
  }

  const set_fumigant = (fumigant) => {
    setFumigant(fumigant);
  }

  const set_radius = (radius) => {
    setRadius(radius);
  }

  return (

    <Box sx={{display: "flex", minHeight: `calc(100vh - 224px)`}}>
      <Filters
        set_county={set_county}
        set_order={set_order}
        set_fumigant={set_fumigant}
        set_radius={set_radius}
      />

      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1}}>
        
        <Typography sx={{mt: "25px", mb: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
          {NOI_SEARCH}
        </Typography>

        <NOICards
          county={county}
          order={order}
          fumigant={fumigant}
          radius={radius}
          location={props.location}
        />
      </Box>
    </Box>


  );
};

export default NOIs;




