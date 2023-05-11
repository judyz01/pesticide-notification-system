import React from "react";

import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{
        display: "flex", 
        background: "#227711", 
        left:0,
        bottom:0,
        right:0,
    }}>
        <Box
            component="img"
            sx={{
            width: "auto",
            height: 60,
            opacity: "50%",
            mt: "30px",
            mb: "30px",
            ml: "15px",
            display: { xs: "block", sm: "block" } 
            }}
            alt="logo-white"
            src="../images/davislogo_white.png"
          />
    </Box>
  );
};
export default Footer;


