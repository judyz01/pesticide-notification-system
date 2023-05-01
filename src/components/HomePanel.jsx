import React from "react";

import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from "react-i18next";
import CommunityVoices from "./CommunityVoices";
import Emergency from "./Emergency";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views-react-18-fix';


function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const HomePanel = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  

  return (
    <Box sx={{display: "flex", direction: "column", backgroundColor: "#EAEAEA", width: "20%", display:{ xs: "none" , sm: "none", lg: "block" } }}>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab sx={{ pt:3, pb:3 }} label="Emergency" {...a11yProps(0)} />
          <Tab sx={{ pt:3, pb:3 }} label="Community" {...a11yProps(1)} />
        </Tabs>

        <SwipeableViews 
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <Emergency/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CommunityVoices/>
          </TabPanel>
        </SwipeableViews>
    </Box>
  );
};

export default HomePanel;

