import * as React from 'react';
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';


const NOICards = () =>  {
  const data = [
      { name: "Asana XL Insecticide", distance: "1.2 miles", time: "9:38 am", method: "Restricted" },
      { name: "Abba Ultra Miticide/Insecticide", distance: "2.2 miles", time: "9:38 am", method: "Non-Restricted" },
      { name: "Besiege Insecticide", distance: "3.2 miles", time: "9:38 am", method: "Restricted" },
  ];
  return (
    <Stack
      spacing="20px"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ width: "100%"}}
    >
      {data.map((elem) => (
          <Card sx={{ display:"flex", width: "80%", borderRadius: "16px", justifyContent: "space-between" }}>
            <Box sx={{ flexDirection: "column" }}>
              <CardHeader
                title={`${elem.name}`}
              />
              <CardContent>
                <Typography variant="h11" color="#A5ADBB">
                  Address: 
                </Typography>

                <Typography color="#A5ADBB">
                  Coverage:
                </Typography>
              </CardContent>
            </Box>

            {/* TODO: Not responsive for smaller devices (less than m) yet */}
            <CardMedia sx={{ pt:"40px", flexDirection: "column", width: "20%", display:{ xs: "none" , m: "block", lg: "block" }}}>
              <Stack direction="row" alignItems="center" gap={2}>
                <LocationOnOutlinedIcon />
                <Typography variant="body1">
                {`${elem.distance}`}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2}>
                <AccessTimeOutlinedIcon />
                <Typography variant="body1">
                {`${elem.time}`}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2}>
                <WarningAmberOutlinedIcon />
                <Typography variant="body1">
                {`${elem.method}`}
                </Typography>
              </Stack>

            </CardMedia>

          </Card>
      ))}
    </Stack>
  );

}

export default NOICards;