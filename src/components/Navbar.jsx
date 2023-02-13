import React, { useState, useEffect } from "react";
import updateMedia from "react";
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const navItems = ['Resources', 'NOIs'];

const Navbar = () => {

  const [showButtons, setShowButtons] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });


  const renderButtons = () => {
    return(
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
              color: "#126701" }}
          >
            <Link style={{textDecoration: "none", color: "#126701"}} to={`/${item}`}>
              {item}
            </Link>
          </Button>
        ))}
      </Box>
    );
  };

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
                display: { xs: "block", sm: "block" } 
              }}
              alt="logo"
              src="../images/logo.png"
          />
        </a>

        <Box sx={{ display: "flex", flexDirection: "column"}}>
          
          <Box sx={{m:"20px", display: { xs: "block", sm: "block" } }}>
            <Button sx={{float: "right", variant:"contained", backgroundColor:"#F79407", color:"white"}}>
              Español 
            </Button>
          </Box>
         {isMobile ? setShowButtons(false) : undefined}
          <Box sx={{m:"20px", display: { xs: "block", sm: "none" } }}>
            <Button 
            sx={{float:"right"}}
            startIcon={<MenuIcon sx={{width:"40px", height:"40px"}}/>} 
            onclick={() => {
              setShowButtons(true); 
              renderButtons();
            }}
            />
          </Box>
          {/* TODO // add logic that decides whether to render or not, always for desktop view, 
          toggle for mobile view based on menu button click*/}
        {showButtons ? renderButtons() : undefined}
         
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
