import * as React from 'react';
import { useTranslation } from "react-i18next";
import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateRangeFilter(props) {
  const { t } = useTranslation();

  const START_DATE = t("Start Date");
  const END_DATE = t("End Date");


  
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'minDate': {
        return 'Invalid Date';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  React.useEffect(() => {

    props.start_date_func(startDate);
    props.end_date_func(endDate);

  }, [startDate, endDate, props]);

  return (
    <Stack direction="column" gap={2} sx={{width: "100%", mt:3}}>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label={START_DATE}
            inputFormat="MM/DD/YYYY"
            value={startDate}
            onChange={handleStartDate}
          />

          <DatePicker 
            label={END_DATE}
            inputFormat="MM/DD/YYYY"
            minDate={startDate}
            value={endDate}
            onError={(newError) => setError(newError)}
            onChange={handleEndDate}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
          />
      </LocalizationProvider>

    </Stack>
  );
}