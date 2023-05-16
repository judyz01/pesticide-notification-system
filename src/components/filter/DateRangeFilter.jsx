import * as React from 'react';
import { useTranslation } from "react-i18next";
import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function DateRangeFilter(props) {
  const { t } = useTranslation();

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

  // React.useEffect(() => {
  //   props.func(distanceDateOrder);
  // }, [distanceDateOrder, props]);

  /*
  - only send request when both props are received

  Validation:
  - end date has to be greater than start date
    - if change start date to be greater than end date, call error for end date
  
  - start date has to be less than end date
    - set a minimum date for end date to be the start date to avoid errors
  */

  return (
    <Stack direction="column" gap={2} sx={{width: "100%", mt:3}}>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker 
            inputFormat="MM/DD/YYYY"
            label="Start Date" 
            value={startDate}
            onChange={handleStartDate}
          />
        </DemoContainer>

        <DemoContainer components={['DatePicker']}>
          <DatePicker 
            label="End Date"
            inputFormat="MM/DD/YYYY"
            minDate={startDate}
            value={endDate}
            onChange={handleEndDate}
            onError={(newError) => setError(newError)}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

    </Stack>
  );
}
