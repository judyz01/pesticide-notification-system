import * as React from 'react';
import { Slider } from '@mui/material';

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
    min={1}
    max={10}
    onChange={handleChange}
  />

  );
}