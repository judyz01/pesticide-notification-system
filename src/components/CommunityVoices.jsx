import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from '@mui/material';

const CommunityVoices = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{display: "flex", direction: "column", overflow: "scroll", backgroundColor: "#EAEAEA", width: "20%", display:{ xs: "none" , sm: "none", lg: "block" } }}>
      <Box sx={{pt: "45px", pl: "20px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
        {t("Community Voices")}
      </Box>

      <Box sx={{m:"20px"}}>

        "{t("CommunityUser1")}"

        {/* <Box sx={{mt:"10px"}}>
          - Nyeland interviewee 
        </Box> */}
      </Box>
      <Box sx={{m:"20px"}}>

        "{t("CommunityUser2")}"

        {/* <Box sx={{mt:"10px"}}>
          User 2
        </Box> */}
      </Box>
      <Box sx={{m:"20px"}}>

        "{t("CommunityUser3")}"

        {/* <Box sx={{mt:"10px"}}>
          User 3
        </Box> */}
      </Box>
    </Box>
  );
};

export default CommunityVoices;

