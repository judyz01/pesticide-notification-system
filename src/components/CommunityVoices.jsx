import React from "react";

import { Box } from '@mui/material';
import { useTranslation } from "react-i18next";

const CommunityVoices = () => {
  const { t } = useTranslation();
  const USER_1 = t("CommunityUser1");
  const USER_2 = t("CommunityUser2");
  const USER_3 = t("CommunityUser3");

  return (
    <Box sx={{display: "flex", direction: "column", backgroundColor: "#EAEAEA", width: "20%", display:{ xs: "none" , sm: "none", lg: "block" } }}>
      <Box sx={{pt: "45px", pl: "20px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
        {t("Community Voices")}
      </Box>

      <Box sx={{m:"20px"}}>

        "{USER_1}"

        {/* <Box sx={{mt:"10px"}}>
          - Nyeland interviewee 
        </Box> */}
      </Box>
      <Box sx={{m:"20px"}}>

        "{USER_2}"

        {/* <Box sx={{mt:"10px"}}>
          User 2
        </Box> */}
      </Box>
      <Box sx={{m:"20px"}}>

        "{USER_3}"

        {/* <Box sx={{mt:"10px"}}>
          User 3
        </Box> */}
      </Box>
    </Box>
  );
};

export default CommunityVoices;

