import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from '@mui/material';
import Filters from "./Filters";

import NOICards from "./NOICards";

const NOIs = () => {
  const { t } = useTranslation();

  return (

    <Box sx={{display: "flex"}}>
      <Filters/>

      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1}}>
        
        <Typography sx={{mt: "25px", mb: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
          {t("NOISearch")}
        </Typography>

        <NOICards/>
      </Box>
    </Box>


  );
};

export default NOIs;




