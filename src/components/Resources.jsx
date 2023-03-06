import React from "react";

import { Box, Link, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

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
}));

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
        What To Do In Case Of Pesticide Exposure
      </Typography>


      <Box sx={{width:"80%"}}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>
              At Home
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontWeight: 600 }}>
              Leave the area immediately!
            </Typography>

            <List sx={{ width: "90%" }}>
              {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                const points = [
                  "Close your windows and turn off your air conditioning or heater.",
                  "Leave the area immediately or call 911 if you feel too sick to drive.",
                  "Change out of your contaminated clothes and shower with warm water and soap.",
                  "If you think your clothes were hit by pesticides, put them in a paper bag, then seal inside a plastic bag for testing. Otherwise, wash them separately from other laundry."
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
              Warn your neighbors
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              Call for help
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              If you feel seriously ill, call 911. Otherwise, call your&nbsp; 
              <Link rel="noopener noreferrer" href="https://www.cdfa.ca.gov/exec/county/countymap/" target="_blank" underline="hover">
                {"County Agriculture Commissioner"}
              </Link>.
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              See a doctor
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              If you experience any symptoms of pesticide exposure, see a doctor immediately.
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              Report pesticide incident
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              Report pesticide drift and pesticide exposure each and every time it happens. Follow the links to report incidents in&nbsp; 

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
              </Link>, and&nbsp; 
              <Link rel="noopener noreferrer" href="https://ivan-kings.org/" target="_blank" underline="hover">
                {"Kings"}
              </Link> Counties.
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              Record everything
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              Write down all of the details of the exposure before you forget anything. 
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              Organize your community
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              Talk to others who may have been exposed and tell them to report their exposure too. Put pressure on local agencies to make sure that your case is dealt with! Call local community organizations for assistance.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>
              At Work
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontWeight: 600, pb:"15px"}}>
              Tell your supervisor immediately!
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              See a doctor 
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              If you experience any symptoms of pesticide exposure. Your employer has to provide transportation to get you to the doctor immediately.
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              Ask your supervisor or employer
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              Which pesticide you were exposed to and tell the doctor.
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              You don’t have to pay
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              For any medical care for pesticide illness if you were exposed to pesticides on the job.
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              Remember! 
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              It is illegal to fire workers for reporting pesticide drift or for seeking medical attention if exposed to pesticides.
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              If you need help
            </Typography>
            <Typography sx={{ pb:"15px" }}>
              Call a community support organization or a local leader.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

    </Box>
  </Box>

  );
};

export default Resources;