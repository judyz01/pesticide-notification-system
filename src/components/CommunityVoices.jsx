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
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
        qui officia deserunt mollit anim id est laborum.”

        <Box sx={{mt:"10px"}}>
          User 1
        </Box>
      </Box>
      <Box sx={{m:"20px"}}>
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
        qui officia deserunt mollit anim id est laborum.”

        <Box sx={{mt:"10px"}}>
          User 2
        </Box>
      </Box>
      <Box sx={{m:"20px"}}>
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
        qui officia deserunt mollit anim id est laborum.”

        <Box sx={{mt:"10px"}}>
          User 3
        </Box>
      </Box>
    </Box>
  );
};

export default CommunityVoices;

