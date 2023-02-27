import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
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

const names = [
  'Closest',
  'Furthest'
];

function getStyles(name, distanceOrder, theme) {
  return {
    fontWeight:
    distanceOrder.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DistanceFilter() {
  const { t } = useTranslation();
  const DISTANCE_LABEL = t("Distance");

  const theme = useTheme();
  const [distanceOrder, setDistanceOrder] = React.useState('Closest');

  const handleChange = (event) => {
    setDistanceOrder(event.target.value);
  };

  return (

    <FormControl sx={{ m: 1, width: "100%", mt: 3  }}>
      <InputLabel id="order-by-distance-label">{DISTANCE_LABEL}</InputLabel>
      <Select
        labelId="order-by-distance-label"
        id="order-by-distance"
        value={distanceOrder}
        label={DISTANCE_LABEL}
        onChange={handleChange}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, distanceOrder, theme)}
            >
              {t(name)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
