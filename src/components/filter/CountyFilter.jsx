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
  'Alameda',
  'Alpine',
  'Amador',
  'Butte',
  'Calaveras',
  'Colusa',
  'Contra Costa',
  'Del Norte',
  'El Dorado',
  'Fresno',
  'Glenn',
  'Humboldt',
  'Imperial',
  'Inyo',
  'Kern',
  'Kings',
  'Lake',
  'Lassen',
  'Los Angeles',
  'Madera',
  'Marin',
  'Mariposa',
  'Mendocino',
  'Merced',
  'Modoc',
  'Mono',
  'Monterey',
  'Napa',
  'Nevada',
  'Orange',
  'Placer',
  'Plumas',
  'Riverside',
  'Sacramento',
  'San Benito',
  'San Bernardino',
  'San Diego',
  'San Francisco',
  'San Joaquin',
  'San Luis Obispo',
  'San Mateo',
  'Santa Barbara',
  'Santa Clara',
  'Santa Cruz',
  'Shasta',
  'Sierra',
  'Siskiyou',
  'Solano',
  'Sonoma',
  'Stanislaus',
  'Sutter',
  'Tehama',
  'Trinity',
  'Tulare',
  'Tuolumne',
  'Ventura',
  'Yolo',
  'Yuba',
];

const countyDict = {};

names.forEach((countyName, index) => {
  countyDict[countyName] = index + 1;
});

export default function CountyDropdown(props) {
  const theme = useTheme();
  const [countyName, setcountyName] = React.useState(props.currentCounty.map((val) => names[val-1]));
  const [countyIndex, setcountyIndex] = React.useState(props.currentCounty);

  const { t } = useTranslation();
  const COUNTY_LABEL = t("Select County");

  React.useEffect(() => {
    if(props.clearFilters == true) {
      handleClear();
      props.resetFilters();
    }
  }, [props.clearFilters]);

  const handleClear = () => {
    setcountyName([]);
    setcountyIndex([]);
  };

  const handleChange = (event) => {

    const {
      target: { value },
    } = event;

    var countyIndexes = [];
    value.forEach((name, idx) => {
      countyIndexes.push(countyDict[name]);
    });

    // County index prop passed to NOICards for axios request
    setcountyIndex(countyIndexes);

    // County names used for labelling here
    setcountyName(
      typeof value === 'string' ? value.split(',') : value,
    );

  };

  React.useEffect(() => {
    props.func(countyIndex);
  }, [countyIndex, props]);

  return (
      <FormControl data-testid="county" sx={{ width: "100%", mt: 3 }}>
        <InputLabel id="county-label"> {COUNTY_LABEL} </InputLabel>
        <Select
          labelId="county-label"
          id="county"
          multiple
          value={countyName}
          label={COUNTY_LABEL}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{COUNTY_LABEL}</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
