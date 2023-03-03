import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const navItems = ["NOIS", "Resources"];
  const [showButtons, setShowButtons] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isDesktop, setDesktop] = useState(true);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("sp");


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

  const changeLanguage = () => {
    language === "en" ? setLanguage("sp") : setLanguage("en");
    i18n.changeLanguage(language);
  }

  const renderButtons = () => {
    return(
      <Box sx={{
        display: { xs: "flex", sm: "flex" }, 
        flexDirection: {xs: "column", sm: "row"},
        position: "relative", 
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
              {t("Home")}
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
            onClick={() => !isDesktop ? setShowMenu(false): undefined}
          >
            <Link style={{textDecoration: "none", color: "#126701"}} to={`/${item}`}>
              {t(item)}
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
        boxShadow: 5,
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
            <Button 
              sx={{
                float: "right", 
                variant:"contained", 
                backgroundColor:"#F79407", 
                color:"white"}}
              onClick={() => changeLanguage()}
            >
              {t("Language")}
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
