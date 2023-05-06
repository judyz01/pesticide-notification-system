import React, { useState, useEffect } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, ClickAwayListener, Slide, Toolbar, useScrollTrigger } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


function HideOnScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = (props) => {
  const navItems = ["NOIS", "Resources"];
  const [showButtons, setShowButtons] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isDesktop, setDesktop] = useState(true);

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("sp");
  const HOME = t("Home");
  const LANGUAGE = t("Language");

  useEffect(() => {
    if (window.innerWidth >= 600) {
      setShowButtons(true);
      setDesktop(true);
      setShowMenu(false);
    } else {
      setShowButtons(false);
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth >= 600) {
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
              {HOME}
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
      <ClickAwayListener onClickAway={() => setShowMenu(false)}>
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
      </ClickAwayListener>
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
                width: "auto",
                height: 50,
                display: { xs: "block", sm: "block" } 
              }}
              alt="logo"
              src="../images/davislogo.png"
          />
        </a>

        <Box sx={{ display: "flex", flexDirection: "column"}}>
          
          <Box sx={{pr:"10px", m:"20px", display: { xs: "block", sm: "block" } }}>
            <Button 
                sx={{
                  float: "right", 
                  variant:"contained", 
                  backgroundColor:"#F79407", 
                  color:"white",
                  "&:hover": {
                    backgroundColor: "#f78307",
                    "@media (hover: none)": {
                      backgroundColor: "#F79407",
                      "&:active": {
                        backgroundColor: "#f78307"
                      }
                    }}
                  }}
              onClick={() => changeLanguage()}
            >
              {LANGUAGE}
            </Button>
          </Box>
          <Box sx={{display: { xs: "block", sm: "none" }}}>
            <Button 
              sx={{pr:"25px", float:"right", minWidth:"0px"}}
              onClick={() => setShowMenu(!showMenu)}
            >
              <MenuIcon sx={{ width:"30px", height:"30px"}}/>
            </Button> 
          </Box>
        {showButtons ? renderButtons() : undefined}
        {showMenu ? renderMenu() : undefined}

        </Box>
      </Toolbar>
    );
  };

  return (
    <HideOnScroll {...props}>
      <AppBar sx={{
        backgroundColor: "#FFFFFF",
      }}>
        {displayDesktop()}
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
