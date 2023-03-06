import React from "react";

import { Box, Typography } from '@mui/material';

const Resources = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1, height: "100vh"}}>
      <Box>
        <img style={{ width: "300px", height: "auto" }} alt="cat" src="../images/cat.png"/>
      </Box>

      <Typography variant="h3" color="#126701">
        Under Construction
      </Typography>
    </Box>

  );
};

export default Resources;