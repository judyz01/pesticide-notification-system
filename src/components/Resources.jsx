import React from "react";

import { Box, Link, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import { useTranslation } from "react-i18next";

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#f2f3f4' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  backgroundColor: "#126701",
  color:"#f2f3f4"
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Resources = () => {

  const { t } = useTranslation();

  const [expanded, setExpanded] = React.useState('');
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{display: "flex", minHeight: `calc(100vh - 224px)`}}>

    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fdf7ee", flexGrow: 1}}>
      
      <Typography sx={{m:"25px", pl:"25px", fontSize: 28, fontWeight: 600, color: "#126701"}}>
        {t("What To Do")}
      </Typography>


      <Box sx={{width:"80%"}}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>
              {t("At Home")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontWeight: 600 }}>
              {t("Leave")}
            </Typography>

            <List sx={{ width: "90%" }}>
              {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                const points = [
                  t("Close"),
                  t("Leave the area"),
                  t("Change"),
                  t("If you think")
                ]

                return (
                  <ListItem
                    key={value}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={points[value]} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            <Typography sx={{ fontWeight: 600, pb:"15px"}}>
              {t("Warn")}
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Call")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Ill")}&nbsp; 
              <Link rel="noopener noreferrer" href="https://www.cdfa.ca.gov/exec/county/countymap/" target="_blank" underline="hover">
                {t("Commissioner")}
              </Link>.
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Doctor")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Symptoms")}
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Report")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Drift")}&nbsp; 

              <Link rel="noopener noreferrer" href="https://ivanfresno.org/report" target="_blank" underline="hover">
                {"Fresno"}
              </Link>,&nbsp; 
              <Link rel="noopener noreferrer" href="https://ivan-imperial.org/" target="_blank" underline="hover">
                {"Imperial"}
              </Link>,&nbsp; 
              <Link rel="noopener noreferrer" href="https://kernreport.org/" target="_blank" underline="hover">
                {"Kern"}
              </Link>,&nbsp; 
              <Link rel="noopener noreferrer" href="https://ivantulare.org/" target="_blank" underline="hover">
                {"Tulare"}
              </Link>, {t("and")}&nbsp; 
              <Link rel="noopener noreferrer" href="https://ivan-kings.org/" target="_blank" underline="hover">
                {"Kings"}
              </Link>{t("Counties")}
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Record")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Write")} 
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Organize")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Talk")}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>
              {t("At Work")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontWeight: 600, pb:"15px"}}>
              {t("Supervisor")}
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Doctor")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Experience")}
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Ask")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Which Pesticide")}
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Don't Pay")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Exposed")}
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Remember")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Illegal")}
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {t("Help")}
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              {t("Community Support")}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

    </Box>
  </Box>

  );
};

export default Resources;