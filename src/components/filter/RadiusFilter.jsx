import * as React from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(theme) {
  return {
    fontWeight: theme.typography.fontWeightRegular
  };
}

export default function RadiusFilter(props) {
  const { t } = useTranslation();
  const RADIUS_LABEL = t("Set Radius");

  const theme = useTheme();
  const [radius, setRadius] = React.useState(props.radius);

  const handleChange = (event) => {
    setRadius(event.target.value);
  };

  React.useEffect(() => {
    props.func(radius);
  }, [radius, props]);

  return (
    <FormControl sx={{ minWidth:"120px", width: "20%"}}>
      <InputLabel id="order-by-radius-label">{RADIUS_LABEL} </InputLabel>
      <Select
        labelId="order-by-radius-label"
        id="order-by-radius"
        value={radius}
        label={RADIUS_LABEL}
        onChange={handleChange}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {radiusMarks.map((name) => (
          <MenuItem
            key={name.label}
            value={name.value}
            style={getStyles(theme)}
          >
            {name.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}