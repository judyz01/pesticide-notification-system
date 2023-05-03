import React from "react";

import { Box, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

const Emergency = () => {
  const { t } = useTranslation();

  return (
    // #d0342c red
    <>
      <Box sx={{pt: "10px", pl: "20px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
        {t("Emergency")}
      </Box>

      <Box sx={{m:"20px", fontSize: 18, fontWeight: 600, color: "#d0342c" }}>
        {t("Call 911")}
      </Box>


      <Box sx={{m:"20px"}}>
        {t("Leave the area")}
      </Box>

      <Box sx={{m:"20px"}}>
        {t("If you think")}
      </Box>

      <Box sx={{m:"20px"}}>
        {t("Symptoms")}
      </Box>

      <Box sx={{m:"20px"}}>
        {t("Write")}
      </Box>

      <Box sx={{m:"20px"}}>
        {t("Talk")}
      </Box>




    </>
  );
};

export default Emergency;

