import React from "react";
import { Box, Slider, Typography } from '@mui/material';

const radiusMarks = [
  {
    value: 1,
    label: '1 mi.',
  },
  {
    value: 5,
    label: '5 mi.',
  },
  {
    value: 10,
    label: '10 mi.',
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return value;
}

const Filters = () => {
  return (
    // TODO: Implement filters for mobile view
    <Box sx={{display: "flex", direction: "column", overflow: "scroll", backgroundColor: "#EAEAEA", width: "20%", minWidth: "150px", display:{ xs: "none" , sm: "block" } }}>
      <Typography align='center' sx={{pt: "45px", fontSize: 21, fontWeight: 600, color: "#126701" }}>
        Filters
      </Typography>

      <Box sx={{p: "30px", width: "100%"}}>
        <Slider
          defaultValue={1}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={radiusMarks}
          min={1}
          max={10}
        />
      </Box>
    </Box>
  );
};

export default Filters;

