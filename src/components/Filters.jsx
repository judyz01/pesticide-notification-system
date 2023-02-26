import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Stack, Typography } from '@mui/material';
import { CountyFilter, DateFilter, DistanceFilter, FumigantFilter, RadiusFilter } from './filter';





const Filters = () => {
  const { t } = useTranslation();

  return (
    // TODO: Implement filters for mobile view
    <Box sx={{display: "flex", direction: "column", backgroundColor: "#EAEAEA", width: "20%", minWidth: "150px", display:{xs: "none" , md: "block" } }}>
      <Typography align='center' sx={{pt: "45px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
        {t("Filters")}
      </Typography>

      <Stack direction="column" alignItems="left" spacing={5} sx={{ pl: "15%", pr: "15%", pt: "30px"}}>

        <RadiusFilter />
        <CountyFilter />
        <DateFilter />
        <DistanceFilter />
        <FumigantFilter />



      </Stack>
    </Box>
  );
};

export default Filters;

