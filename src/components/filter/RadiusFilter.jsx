import * as React from 'react';

import { Slider } from '@mui/material';

const radiusMarks = [
  {
    value: 5,
    label: '5 mi.',
  },
  {
    value: 10,
    label: '10 mi.',
  },
  {
    value: 15,
    label: '15 mi.',
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return value;
}

export default function RadiusFilter(props) {

  const [radius, setRadius] = React.useState();

  const handleChange = (event) => {
    setRadius(event.target.value);
  };

  React.useEffect(() => {
    props.func(radius);
  }, [radius, props]);

  return (
    <Slider
      defaultValue={1}
      valueLabelFormat={valueLabelFormat}
      getAriaValueText={valuetext}
      step={null}
      valueLabelDisplay="auto"
      marks={radiusMarks}
      min={5}
      max={15}
      onChange={handleChange}
    />
  );
}