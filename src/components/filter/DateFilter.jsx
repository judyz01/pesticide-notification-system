import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';



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
  'Least Recent'
];

function getStyles(name, dateOrder, theme) {
  return {
    fontWeight:
    dateOrder.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function DateFilter() {
  const theme = useTheme();
  const [dateOrder, setDateOrder] = React.useState('Most Recent');

  const handleChange = (event) => {
    setDateOrder(event.target.value);
  };

  return (

    <FormControl sx={{ m: 1, width: "100%", mt: 3  }}>
      <InputLabel id="order-by-date-label">Order by Date</InputLabel>
      <Select
        labelId="order-by-date-label"
        id="order-by-date"
        value={dateOrder}
        label="Order by Date"
        onChange={handleChange}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, dateOrder, theme)}
            >
              {name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
