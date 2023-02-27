import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, CardMedia, Skeleton, Stack, Typography } from '@mui/material';
import { AccessTimeOutlined, LocationOnOutlined, WarningAmberOutlined}  from '@mui/icons-material';
import axios from 'axios';

function loadSkeleton() {
  return [
    <Skeleton sx={{m:"15px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
  ];
}

const NOICards = () =>  {
  const [pesticideData, setPesticideData] = useState('');

  const update = () => {
    // TODO: pass current location to latitude and longitude
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

  if (!pesticideData) return loadSkeleton();

  // Sort by date from newest to oldest
  pesticideData.sort(function (a, b) {
    return new Date(b.applic_dt) - new Date(a.applic_dt);
  });

  // TODO: reverse geocoding apis too costly, need to find better alternative
  // const findAddress = (elem) => {
  //   axios.get(`http://nominatim.openstreetmap.org/reverse?format=json`, {
  //       params: { lat: 54.9824031826, lon: 9.2833114795 },
  //   })
  //   .then((response) => {
  //     const address = response.data.display_name;
  //     console.log(address)
  //     return address
  //   })
  //   .catch(function (error) {
  //       console.error(error);
  //   });
  // }

  // findAddress();

  const getApplicatorType = (char) => {
    switch(char) {
      case 'A':
        return "Aerial";
      case 'B':
        return "Ground";
      case 'C':
        return "Aerial/Ground";
      default:
        return "N/A";
    }
  }

  const getStandardTime = (time) => {

    // Times that are listed null
    if (!time) {
      return "";
    }

    var militaryTime = time.padStart(4, '0');

    var militaryHour = parseInt(militaryTime.substring(0,2));
    var standardHour = ((militaryHour + 11) % 12) + 1;
    var amPm = militaryHour > 11 ? 'PM' : 'AM';
    var minutes = militaryTime.substring(2);


    return standardHour + ':' + minutes + amPm;
  };

  return (

    <Stack
      spacing="20px"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      overflow="auto"
      sx={{ width: "100%", mb: "30px"}}
    >
      {pesticideData.map((elem, index) => (
        <Card key={index} sx={{ display:"flex", width: "80%", borderRadius: "16px", justifyContent: "space-between" }}>
            <Box key={index} sx={{ flexDirection: "column" }}>

                <CardHeader
                  title={`${elem.product_name}`}
                  sx={{pb:0}}
                />
              
              <CardContent>
                <Typography variant="h11" color="#A5ADBB">
                  Address: {`${elem.latitude}`}, {`${elem.longitude}`}
                </Typography>

                <Typography color="#A5ADBB">
                  Coverage: {`${elem.acre_treated}`} acres
                </Typography>
              </CardContent>
            </Box>

          <CardMedia sx={{ pt:"35px", pb:"25px", flexDirection: "column", width: "20%", display:{ xs: "none" , m: "block", lg: "block" }}}>
            <Stack direction="row" alignItems="center" gap={2}>
              <LocationOnOutlined />
              <Typography variant="body1">
                TBD
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={2} sx={{pt:"5px"}}>
              <AccessTimeOutlined />
              <Stack direction="column">
                <Typography variant="body1">
                  {`${getStandardTime(elem.applic_time)}`} 
                </Typography>
                <Typography>
                  {`${elem.applic_dt}`} 
                </Typography>

              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" gap={2} sx={{pt:"5px"}}>
              <WarningAmberOutlined />
              <Typography variant="body1">
              {`${getApplicatorType(elem.aer_grnd_ind)}`}
              </Typography>
            </Stack>

          </CardMedia>
        </Card>
      ))}
    </Stack>
  );

}

export default NOICards;