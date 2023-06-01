import * as React from "react";

import { useTranslation } from "react-i18next";
import { Box, Button, Drawer, Stack, Typography, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

import { Filters, NOICards } from "./";

const NOIs = (props) => {
  const { t } = useTranslation();
  const NOI_SEARCH = t("NOISearch");

  const [county, setCounty] = React.useState([1]);
  const [order, setOrder] = React.useState();
  const [radius, setRadius] = React.useState();
  const [fumigant, setFumigant] = React.useState();
  const [aerialGround, setAerialGround] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const [isDesktop, setDesktop] = React.useState(true);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [dontRefresh, setDontRefresh] = React.useState(false);

  const [currentCounty, setCurrentCounty] = React.useState([1]);
  const [currentOrder, setCurrentOrder] = React.useState('');
  const [currentRadius, setCurrentRadius] = React.useState(5);
  const [currentFumigant, setCurrentFumigant] = React.useState(false);
  const [currentAerialGround, setCurrentAerialGround] = React.useState('');
  const [currentStartDate, setCurrentStartDate] = React.useState();
  const [currentEndDate, setCurrentEndDate] = React.useState();


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

  const set_start_date = (start_date) => {
    setStartDate(start_date);
    setCurrentStartDate(start_date);
  }

  const set_end_date = (end_date) => {
    setEndDate(end_date);
    setCurrentEndDate(end_date);
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
          set_start_date={set_start_date}
          set_end_date={set_end_date}

          currentCounty={currentCounty}
          currentOrder={currentOrder}
          currentRadius={currentRadius}
          currentFumigant={currentFumigant}
          currentAerialGround={currentAerialGround}
          currentStartDate={currentStartDate}
          currentEndDate={currentEndDate}
        />
      }

      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1}}>

        <Stack direction="row" justifyContent="center" alignItems="center"> 
          <Typography align="center" sx={{mt: "25px", mb: "25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
            {NOI_SEARCH} 
          </Typography>

          <Tooltip title="A Notice of Intent is a document submitted by an agricultural grower indicating a site and intended start date for a Restricted Material application. The grower must submit an NOI at least 24 hours in advance of each application and is allowed a 72 hour grace period." arrow placement="right">
              <HelpIcon opacity="0.5" sx={{ml:"10px"}}/>
          </Tooltip>
        </Stack>

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
              set_start_date={set_start_date}
              set_end_date={set_end_date}

              currentCounty={currentCounty}
              currentOrder={currentOrder}
              currentRadius={currentRadius}
              currentFumigant={currentFumigant}
              currentAerialGround={currentAerialGround}
              currentStartDate={currentStartDate}
              currentEndDate={currentEndDate}
            />
          </Drawer>
        }

        <NOICards
          county={county}
          order={order}
          radius={radius}
          fumigant={fumigant}
          aerialGround={aerialGround}
          startDate={startDate}
          endDate={endDate}

          location={props.location}
          dontRefresh={dontRefresh}
        />

      </Box>
    </Box>

  );
};

export default NOIs;




