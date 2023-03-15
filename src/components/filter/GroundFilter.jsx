import * as React from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation } from "react-i18next";

export default function GroundFilter(props) {
  const { t } = useTranslation();
  const GROUND_LABEL = t("Ground");

  const [checked, setChecked] = React.useState(props.currentGround);

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
          label={GROUND_LABEL}
          labelPlacement="end"
          checked={checked}
          onChange={handleChange}
    />
  );
}
