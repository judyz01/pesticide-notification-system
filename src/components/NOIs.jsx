import * as React from "react";

import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from '@mui/material';
import Filters from "./Filters";
import CloseIcon from '@mui/icons-material/Close';

import { Filters, NOICards }from "./";

const NOIs = (props) => {
  const { t } = useTranslation();
  const NOI_SEARCH = t("NOISearch");

  const [county, setCounty] = React.useState([]);
  const [order, setOrder] = React.useState();
  const [fumigant, setFumigant] = React.useState();
  const [radius, setRadius] = React.useState();
  const [isDesktop, setDesktop] = React.useState(true);
  const [showDrawer, setShowDrawer] = React.useState(false);

  React.useEffect(() => {
    if (window.innerWidth > 1199) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 1199) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const filterDrawer = () => {
    return(
      <Box sx={{ 
        position: "absolute",
        width:"200px",
        top:"100px",
        boxShadow: 5,
        backgroundColor:"#EAEAEA",
        pb: "20px",
        zIndex: 1000 }}
        >
          <Button 
            sx={{zIndex: 1100, position: 'absolute', top:"25px", left:"150px"}}
            startIcon={<CloseIcon sx={{width:"20px", height:"20px"}}/>} 
            onClick={() => setShowDrawer(false)}
          />
          <Filters
            set_county={set_county}
            set_order={set_order}
            set_fumigant={set_fumigant}
            set_radius={set_radius}
          />
      </Box>
    );
  };

  const set_county = (county) => {
    setCounty(county);
  }

  const set_order = (order) => {
    setOrder(order);
  }

  const set_fumigant = (fumigant) => {
    setFumigant(fumigant);
  }

  const set_radius = (radius) => {
    setRadius(radius);
  }

  return (
    <Box sx={{display: "flex", minHeight: `calc(100vh - 224px)`}}>
      
      {showDrawer && !isDesktop && filterDrawer()}
      {!isDesktop ? 
        <Button sx={{ 
              display: "flex",
              height: "20px",
              mt: "30px",
              ml: "10px",
              p: "12px",
              backgroundColor:"#F79407", 
              color:"white"
              }}
          onClick={() => setShowDrawer(true)}
        >
          {t("Filters")}
        </Button>  : 
        <Filters
          set_county={set_county}
          set_order={set_order}
          set_fumigant={set_fumigant}
          set_radius={set_radius}
        />
      }
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1}}>
        <Typography sx={{mt: "25px", mb: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
          {NOI_SEARCH}
        </Typography>
        <NOICards
          county={county}
          order={order}
          fumigant={fumigant}
          radius={radius}
          location={props.location}
        />
      </Box>
    </Box>


  );
};

export default NOIs;




