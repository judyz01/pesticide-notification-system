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
  'Aerial',
  'Ground',
  'Aerial/Ground'
];

function getStyles(name, aerialGroundOrder, theme) {
  return {
    fontWeight:
    aerialGroundOrder.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DateFilter(props) {
  const { t } = useTranslation();
  const INPUT_LABEL = t("Applicant Type");

  const theme = useTheme();
  const [aerialGroundOrder, setAerialGroundOrder] = React.useState(props.currentAerialGround);

  React.useEffect(() => {
    if(props.clearFilters == true) {
      handleClear();
      props.resetFilters();
    }
  }, [props.clearFilters])

  const handleClear = () => {
    setAerialGroundOrder('');
  };

  const handleChange = (event) => {
    setAerialGroundOrder(event.target.value);
  };

  React.useEffect(() => {
    props.func(aerialGroundOrder);
  }, [aerialGroundOrder, props]);

  return (
    <FormControl data-testid="aerialground" sx={{ width: "100%", mt: 3  }}>
      <InputLabel id="order-by-aerial-ground-date-label">{INPUT_LABEL}</InputLabel>
      <Select
        labelId="order-by-distance-date-label"
        id="order-by-distance-date"
        value={aerialGroundOrder}
        label={INPUT_LABEL}
        onChange={handleChange}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
          >
            {t(name)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
