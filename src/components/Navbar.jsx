import React, { useState, useEffect } from "react";
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const navItems = ['Resources', 'NOIs'];

const Navbar = () => {

  const [showButtons, setShowButtons] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isDesktop, setDesktop] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 599) {
      setShowButtons(true);
      setDesktop(true);
      setShowMenu(false);
    } else {
      setShowButtons(false);
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 599) {
        setShowButtons(true);
        setDesktop(true);
        setShowMenu(false);
      } else {
        setShowButtons(false);
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

 /*display: { xs: "none", sm: "block" } */
  const renderButtons = () => {
    return(
      <Box sx={{
        display: { xs: "flex", sm: "flex" }, 
        flexDirection: {xs: "column", sm: "row"},
        position: "relative", 
        border: {xs: "2px solid #126701", sm: "none"},
        zIndex: 12000 }}>
        {/* TODO // Redundant Code, any other way to route back to "/" instead of "/Home"? */}
        <Button
          sx={{ 
            pl:4,
            pr:4,
            fontSize: 18,
            fontWeight: 600,
            color: "#126701"}}
            onClick={() => !isDesktop ? setShowMenu(false): undefined}
            >
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
              color: "#126701",
              borderTop: {xs: "1px solid #126701", sm: "none"} }}
              onClick={() => !isDesktop ? setShowMenu(false): undefined}
          >
            <Link style={{textDecoration: "none", color: "#126701"}} to={`/${item}`}>
              {item}
            </Link>
          </Button>
        ))}
      </Box>
    );
  };

  const renderMenu = () => {
    return(
      <Box sx={{
        display: "block", 
        position: "absolute",
        top: "119px",
        right: "0px",
        backgroundColor: "#FFFFFF",
        zIndex: 12000 }}>
          {renderButtons()}
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
          <Box sx={{display: { xs: "block", sm: "none" }}}>
            <Button 
            sx={{float:"right"}}
            startIcon={<MenuIcon sx={{width:"30px", height:"30px"}}/>} 
            onClick={() => {
              showMenu ? setShowMenu(false) : setShowMenu(true); 
            }}
            />
          </Box>
          {/* TODO // add logic that decides whether to render or not, always for desktop view, 
          toggle for mobile view based on menu button click*/}
        {showButtons ? renderButtons() : undefined}
        {showMenu ? renderMenu() : undefined}

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
