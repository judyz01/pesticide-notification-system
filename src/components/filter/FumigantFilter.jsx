import * as React from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation } from "react-i18next";

export default function FumigantFilter(props) {
  const { t } = useTranslation();
  const FUMIGANT_LABEL = t("Fumigant");

  const [checked, setChecked] = React.useState(props.currentFumigant);

  React.useEffect(() => {
    if(props.clearFilters == true) {
      handleClear();
      props.resetFilters();
    }
  }, [props.clearFilters])

  const handleClear = () => {
    setChecked(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    props.func(checked);
  }, [checked, props]);

  return (
    <FormControlLabel
          value="end"
          control={<Checkbox data-cy="fumigant-filter" />}
          label={FUMIGANT_LABEL}
          labelPlacement="end"
          checked={checked}
          onChange={handleChange}
    />
  );
}
