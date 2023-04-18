import * as React from "react";

import { useTranslation } from "react-i18next";
import { Box, Button, Drawer, Typography } from '@mui/material';

import { Filters, NOICards } from "./";

const NOIs = (props) => {
  const { t } = useTranslation();
  const NOI_SEARCH = t("NOISearch");

  const [county, setCounty] = React.useState([]);
  const [order, setOrder] = React.useState();
  const [radius, setRadius] = React.useState();
  const [fumigant, setFumigant] = React.useState();
  const [aerialGround, setAerialGround] = React.useState();

  const [isDesktop, setDesktop] = React.useState(true);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [dontRefresh, setDontRefresh] = React.useState(false);

  const [currentCounty, setCurrentCounty] = React.useState([]);
  const [currentOrder, setCurrentOrder] = React.useState('');
  const [currentRadius, setCurrentRadius] = React.useState(5);
  const [currentFumigant, setCurrentFumigant] = React.useState(false);
  const [currentAerialGround, setCurrentAerialGround] = React.useState('');



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

  const set_county = (county) => {
    setCounty(county);
    setCurrentCounty(county);
  }

  const set_order = (order) => {
    setOrder(order);
    setCurrentOrder(order);
  }

  const set_radius = (radius) => {
    setRadius(radius);
    setCurrentRadius(radius);
  }

  const set_fumigant = (fumigant) => {
    setFumigant(fumigant);
    setCurrentFumigant(fumigant);
  }

  const set_aerial_ground = (aerial_ground) => {
    setAerialGround(aerial_ground);
    setCurrentAerialGround(aerial_ground);
  }

  return (
    <Box sx={{display: "flex", minHeight: `calc(100vh - 224px)`}}>

      {/* Filters for Desktop View, left column that does not have a drawer */}
      {isDesktop &&
        <Filters
          set_county={set_county}
          set_order={set_order}
          set_radius={set_radius}
          set_fumigant={set_fumigant}
          set_aerial_ground={set_aerial_ground}

          currentCounty={currentCounty}
          currentOrder={currentOrder}
          currentRadius={currentRadius}
          currentFumigant={currentFumigant}
          currentAerialGround={currentAerialGround}
        />
      }

      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1}}>
        <Typography sx={{mt: "25px", mb: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
          {NOI_SEARCH}
        </Typography>

        { !isDesktop &&
          <>
            {/* SM+ mobile view, filter button inline with text heading */}
            <Box display="flex" sx={{ display: { xs: 'none', sm: 'block' }, m: "30px", position:"absolute", width: "80%" }}>
              <Button sx={{ 
                  display: "flex",
                  height: "20px",
                  p: "16px",
                  backgroundColor:"#F79407", 
                  color:"white",
                  }}
                onClick={() => {
                  setShowDrawer(true);
                  setDontRefresh(true);
                }}
              >
                {t("Filters")}
              </Button> 
            </Box> 

            {/* XS Mobile view, filter button not inline with text heading as it'll overlap */}
            <Box display="flex" sx={{ display: { xs: 'block', sm: 'none' }, mb: "30px", width: "80%" }}>
              <Button sx={{ 
                  display: "flex",
                  height: "20px",
                  p: "16px",
                  backgroundColor:"#F79407", 
                  color:"white",
                  }}
                onClick={() => {
                  setShowDrawer(true);
                  setDontRefresh(true);
                }}
              >
                {t("Filters")}
              </Button> 
            </Box> 

          </>
        }

        {/* Filters for Mobile View, column is a left drawer */}
        {!isDesktop &&
          <Drawer
            anchor={"left"}
            open={showDrawer}
            PaperProps={{
              sx:{width:"250px", backgroundColor: "#EAEAEA"}
            }}
            onClose={() => {
              setShowDrawer(false);
              setDontRefresh(false);
            }}
          > 
            <Filters
              set_county={set_county}
              set_order={set_order}
              set_radius={set_radius}
              set_fumigant={set_fumigant}
              set_aerial_ground={set_aerial_ground}

              currentCounty={currentCounty}
              currentOrder={currentOrder}
              currentRadius={currentRadius}
              currentFumigant={currentFumigant}
              currentAerialGround={currentAerialGround}
            />
          </Drawer>
        }

        <NOICards
          county={county}
          order={order}
          radius={radius}
          fumigant={fumigant}
          aerialGround={aerialGround}
          location={props.location}
          dontRefresh={dontRefresh}
        />

      </Box>
    </Box>

  );
};

export default NOIs;




