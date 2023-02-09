import React from "react";
import { AppBar, Box, Button, Toolbar } from '@mui/material';


const navItems = ['Home', 'Resources', 'NOIs'];

const Navbar = () => {

  const displayDesktop = () => {
    return (
      <Toolbar sx={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Box
            component="img"
            sx={{
              width: 238,
              height: 130,
              display: { xs: "none", sm: "block" } 
            }}
            alt="logo"
            src="../images/logo.png"
          />
        <Box sx={{display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} 
                sx={{ 
                  pl:4,
                  pr:4,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#126701" }}>
                {item}
              </Button>
            ))}
        </Box>
      </Toolbar>
    );
  };

  return (
      <AppBar sx={{
        backgroundColor: "#FFFFFF",
      }}>
        {displayDesktop()}
      </AppBar>

  );
};

export default Navbar;
