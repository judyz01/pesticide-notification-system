import React from "react";

import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from "react-i18next";
import CommunityVoices from "./CommunityVoices";
import Emergency from "./Emergency";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

  const EMERGENCY = t("Emergency");
  const COMMUNITY = t("Community");


  const handleChange = (e, newValue) => {
    setValue(newValue);
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
          <Tab data-testid="emergency-tab" sx={{ pt:3, pb:3 }} label={EMERGENCY} {...a11yProps(0)} />
          <Tab data-testid="community-tab" sx={{ pt:3, pb:3 }} label={COMMUNITY} {...a11yProps(1)} />
        </Tabs>

          <TabPanel value={value} index={0}>
            <Emergency/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CommunityVoices/>
          </TabPanel>
    </Box>
  );
};

export default HomePanel;

