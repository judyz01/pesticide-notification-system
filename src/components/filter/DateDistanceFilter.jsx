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
  'Most Recent',
  'Least Recent',
  'Closest',
  'Furthest'
];

function getStyles(name, distanceDateOrder, theme) {
  return {
    fontWeight:
    distanceDateOrder.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DateFilter(props) {
  const { t } = useTranslation();
  const INPUT_LABEL = t("Date/Distance");

  const theme = useTheme();
  const [distanceDateOrder, setDistanceDateOrder] = React.useState('');

  const handleChange = (event) => {
    setDistanceDateOrder(event.target.value);
  };

  React.useEffect(() => {
    props.func(distanceDateOrder);
  }, [distanceDateOrder, props]);

  return (

    <FormControl sx={{ m: 1, width: "100%", mt: 3  }}>
      <InputLabel id="order-by-distance-date-label">{INPUT_LABEL}</InputLabel>
      <Select
        labelId="order-by-distance-date-label"
        id="order-by-distance-date"
        value={distanceDateOrder}
        label={INPUT_LABEL}
        onChange={handleChange}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, distanceDateOrder, theme)}
          >
            {t(name)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
