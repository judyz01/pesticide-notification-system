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

const names = [
  'Most Recent',
  'Least Recent'
];

export default function DateDistanceFilter(props) {
  const { t } = useTranslation();
  const INPUT_LABEL = t("Date/Distance");

  const [distanceDateOrder, setDistanceDateOrder] = React.useState(props.currentOrder);


  React.useEffect(() => {
    if(props.clearFilters == true) {
      handleClear();
      props.resetFilters();
    }
  }, [props.clearFilters]);

  const handleClear = () => {
    setDistanceDateOrder('');
  };

  const handleChange = (event) => {
    setDistanceDateOrder(event.target.value);
  };

  React.useEffect(() => {
    props.func(distanceDateOrder);
  }, [distanceDateOrder, props]);

  return (
    <FormControl sx={{ width: "100%", mt: 3  }}>
      <InputLabel id="order-by-distance-date-label">{INPUT_LABEL}</InputLabel>
      <Select
        data-cy="order-filter"
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
            // disabled={handleDisable(name)}
          >
            {t(name)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
