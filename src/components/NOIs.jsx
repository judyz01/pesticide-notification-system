import * as React from "react";

import { useTranslation } from "react-i18next";
import { Box, Button, Typography, Drawer } from '@mui/material';

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
  const [dontRefresh, setDontRefresh] = React.useState(false);

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
          onClick={() => {
            setShowDrawer(true);
            setDontRefresh(true);
          }}
        >
          {t("Filters")}
        </Button> 
         : 
        <Filters
          set_county={set_county}
          set_order={set_order}
          set_fumigant={set_fumigant}
          set_radius={set_radius}
        />
      }
      {!isDesktop &&
      <Drawer
        anchor={"left"}
        open={showDrawer}
        PaperProps={{
          sx:{width:"300px", backgroundColor: "#EAEAEA"}
        }}
        onClose={() => {
          setShowDrawer(false);
          setDontRefresh(false);
        }}
       > 
        <Filters
          set_county={set_county}
          set_order={set_order}
          set_fumigant={set_fumigant}
          set_radius={set_radius}
        />
      </Drawer>

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
          dontRefresh={dontRefresh}
        />
      </Box>
    </Box>


  );
};

export default NOIs;




