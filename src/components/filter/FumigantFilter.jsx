import * as React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation } from "react-i18next";

export default function FumigantFilter() {
  const { t } = useTranslation();
  const FUMIGANT_LABEL = t("Fumigant");

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
          value="end"
          control={<Checkbox />}
          label={FUMIGANT_LABEL}
          labelPlacement="end"
          checked={checked}
          onChange={handleChange}
    />
  );
}
