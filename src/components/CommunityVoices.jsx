import React from "react";

import { Box } from '@mui/material';
import { useTranslation } from "react-i18next";

const CommunityVoices = () => {
  const { t } = useTranslation();
  const USER_1 = t("CommunityUser1");
  const USER_2 = t("CommunityUser2");
  const USER_3 = t("CommunityUser3");

  return (
    <>
      <Box data-testid="community-panel" sx={{pt: "10px", pl: "20px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
        {t("Community Voices")}
      </Box>

      <Box sx={{m:"20px"}}>

        "{USER_1}"

      </Box>
      <Box sx={{m:"20px"}}>

        "{USER_2}"

      </Box>
      <Box sx={{m:"20px"}}>

        "{USER_3}"

      </Box>
    </>
  );
};

export default CommunityVoices;

