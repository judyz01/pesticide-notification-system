import * as React from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation } from "react-i18next";

export default function AerialFilter(props) {
  const { t } = useTranslation();
  const AERIAL_LABEL = t("Aerial");

  const [checked, setChecked] = React.useState(props.currentAerial);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    props.func(checked);
  }, [checked, props]);

  return (
    <FormControlLabel
          value="end"
          control={<Checkbox />}
          label={AERIAL_LABEL}
          labelPlacement="end"
          checked={checked}
          onChange={handleChange}
    />
  );
}
