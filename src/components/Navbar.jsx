import React from "react";
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from "react-router-dom";


const navItems = ['Resources', 'NOIs'];

const Navbar = () => {

  const displayDesktop = () => {
    return (
      <Toolbar sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <a href="/">
          <Box
              component="img"
              sx={{
                width: 183,
                height: 100,
                display: { xs: "none", sm: "block" } 
              }}
              alt="logo"
              src="../images/logo.png"
          />
        </a>

        <Box sx={{ display: "flex", flexDirection: "column"}}>
          
          <Box sx={{pl:"275px", m:"20px", display: { xs: "none", sm: "block" } }}>
            <Button sx={{variant:"contained", backgroundColor:"#F79407", color:"white"}}>
              Español 
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {/* TODO // Redundant Code, any other way to route back to "/" instead of "/Home"? */}
                <Button
                  sx={{ 
                    pl:4,
                    pr:4,
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#126701" }}>
                  <Link style={{textDecoration: "none", color: "#126701"}} to={`/`}>
                    Home
                  </Link>
                </Button>

              {navItems.map((item) => (
                <Button key={item} 
                  sx={{ 
                    pl:4,
                    pr:4,
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#126701" }}>
                  <Link style={{textDecoration: "none", color: "#126701"}} to={`/${item}`}>
                    {item}
                  </Link>
                </Button>
              ))}
          </Box>


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
