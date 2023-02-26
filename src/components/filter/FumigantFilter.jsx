import * as React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function FumigantFilter() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="Soil Fumigant"
          labelPlacement="end"
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
    />
  );
}
