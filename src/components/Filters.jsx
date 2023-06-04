import React from "react";

import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

import { AerialGroundFilter, CountyFilter, DateDistanceFilter, DateRangeFilter, FumigantFilter } from './filter';


const Filters = (props) => {
  const { t } = useTranslation();
  const CLEAR_FILTERS = t("Clear All");
  const [clearFilters, setClearFilters] = React.useState(false);

  const get_county = (county) => {
    props.set_county(county);
  }

  const get_order = (order) => {
    props.set_order(order);
  }

  const get_fumigant = (fumigant) => {
    props.set_fumigant(fumigant);
  }
  const get_aerial_ground = (aerialGround) => {
    props.set_aerial_ground(aerialGround);
  }

  const get_start_date = (startDate) => {
    props.set_start_date(startDate);
  }

  const get_end_date = (endDate) => {
    props.set_end_date(endDate);
  }

  const clearAllFilters = () => {
    setClearFilters(true);
  }

  const resetFilters = () => {
    setClearFilters(false);
  }

  return (
    <Box data-testid="filter-panel" sx={{display: "block", direction: "column", backgroundColor: "#EAEAEA", width:{md: "100%", lg: "20%"}, height:{lg:"auto"}}}>
    
      <Typography align='center' sx={{pt: "45px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
        {t("Filters")}
      </Typography>

      <Stack direction="column" alignItems="left" spacing={5} sx={{ mb:"30px", pl: "15%", pr: "15%", pt: "30px"}}>

        <CountyFilter 
          func={get_county}
          currentCounty={props.currentCounty}

          clearFilters={clearFilters}
          resetFilters={resetFilters}
        />
        <DateDistanceFilter 
          func={get_order}
          currentOrder={props.currentOrder}
          currentCounty={props.currentCounty}

          clearFilters={clearFilters}
          resetFilters={resetFilters}
        />

        <AerialGroundFilter 
          func={get_aerial_ground}
          currentAerialGround={props.currentAerialGround}

          clearFilters={clearFilters}
          resetFilters={resetFilters}
        />

        <DateRangeFilter 
          start_date_func={get_start_date}
          currentStartDate={props.startDate}

          end_date_func={get_end_date}
          currentEndDate={props.endDate}

          clearFilters={clearFilters}
          resetFilters={resetFilters}
        />

        <FumigantFilter 
          func={get_fumigant}
          currentFumigant={props.currentFumigant}

          clearFilters={clearFilters}
          resetFilters={resetFilters}
        />

        <Button 
            onClick={clearAllFilters}
            sx={{ 
              display: "flex",
              height: "40px",
              p: "16px",
              variant:"contained", 
              backgroundColor:"#a82822", 
              color:"white",
              "&:hover": {
                backgroundColor: "#a82822",
                "@media (hover: none)": {
                  backgroundColor: "#a82822",
                  "&:active": {
                    backgroundColor: "#a82822"
                  }
                }}
            }}
        >
          {CLEAR_FILTERS}
        </Button> 

      </Stack>
    </Box>
  );
};

export default Filters;

