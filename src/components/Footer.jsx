import React from "react";
import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{
        display: "flex", 
        background: "#227711"
    }}>
        <Box
            component="img"
            sx={{
            width: 220,
            height: 80,
            ml: 1,
            mt: 2,
            mb: 1,
            display: { xs: "none", sm: "block" } 
            }}
            alt="logo-white"
            src="../images/logo-white.png"
          />
    </Box>
  );
};
export default Footer;


