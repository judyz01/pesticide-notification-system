import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

import axios from 'axios';



const NOICards = () =>  {
  const [pesticideData, setPesticideData] = useState('');

  const update = () => {
    axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
        params: { latitude: 37.511418, longitude: -120.81, radius: 1609.34 },
    })
    .then((response) => {
      setPesticideData(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
  };

  useEffect(update, []);

  if (!pesticideData) return null;

  pesticideData.sort(function (a, b) {
    return new Date(b.applic_dt) - new Date(a.applic_dt);
  });

  return (
    <Stack
      spacing="20px"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ width: "100%", mb: "30px"}}
    >
      {pesticideData.map((elem) => (
          <Card sx={{ display:"flex", width: "80%", borderRadius: "16px", justifyContent: "space-between" }}>
            <Box sx={{ flexDirection: "column" }}>
              <CardHeader
                title={`${elem.product_name}`}
              />
              <CardContent>
                <Typography variant="h11" color="#A5ADBB">
                  Address: TBD
                </Typography>

                <Typography color="#A5ADBB">
                  Coverage: {`${elem.acre_treated}`} acres
                </Typography>
              </CardContent>
            </Box>

            {/* TODO: Not responsive for smaller devices (less than m) yet */}
            <CardMedia sx={{ pt:"40px", flexDirection: "column", width: "20%", display:{ xs: "none" , m: "block", lg: "block" }}}>
              <Stack direction="row" alignItems="center" gap={2}>
                <LocationOnOutlinedIcon />
                <Typography variant="body1">
                  TBD
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2}>
                <AccessTimeOutlinedIcon />
                <Typography variant="body1">
                {`${elem.applic_dt}`}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2}>
                <WarningAmberOutlinedIcon />
                <Typography variant="body1">
                {`${elem.aer_grnd_ind}`}
                </Typography>
              </Stack>

            </CardMedia>

          </Card>
      ))}
    </Stack>
  );

}

export default NOICards;