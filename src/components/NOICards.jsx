import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, CardMedia, Skeleton, Stack, Typography } from '@mui/material';
import { AccessTimeOutlined, LocationOnOutlined, WarningAmberOutlined}  from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import axios from 'axios';


function loadSkeleton() {
  return [
    <Skeleton sx={{mb:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
  ];
}

const NOICards = (props) =>  {
  const { t } = useTranslation();
  const COVERAGE_UNIT = t("acres");
  const DISTANCE_UNIT = t("miles");

  const [pesticideData, setPesticideData] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');


  const update = () => {

    // navigator.geolocation.getCurrentPosition(
    //   ({ coords: { latitude: lat, longitude: lng } }) => {
    //     const pos = { lat, lng };
    //     setCurrentLocation({pos});
    //     console.log("found location");
    //     console.log(currentLocation);
    //     console.log(currentLocation.pos.lat);
    //     console.log(currentLocation.pos.lng);
    //   }
    // );


    if (props.location) {
      // axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
      //     params: { latitude: props.location.lat, longitude: props.location.lng, radius: 1609.34, order: "DESC", orderParam: ""},
      // })
      axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
        params: { latitude: 37.511418, longitude: -120.81, radius: 1609.34, order: "ASC", orderParam: "distance"},
      })
      .then((response) => {
        setPesticideData(response.data);
        console.log("Pesticide data received for cards");
      })
      .catch(function (error) {
          console.error(error);
      });
    }
      console.log("No location found");
  };


  useEffect(update, [props], []);


  // These props hold the data from each of the filters - county is array of strings, order is a string, fumigant is boolean, radius is int
  useEffect(() => {
    console.log(props.county);
    console.log(props.order);
    console.log(props.fumigant);
    console.log(props.radius);

    if (props.location) {
      console.log(props.location);
      console.log(props.location.lat);
      console.log(props.location.lng);
    } else {
      console.log("no location yet");
    }
  }, [props], []);

  if (!pesticideData) return loadSkeleton();

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
        return t("Aerial");
      case 'B':
        return t("Ground");
      case 'C':
        return t("Aerial/Ground");
      default:
        return "N/A";
    }
  }

  const getStandardTime = (time) => {

    // Times that are listed null
    if (!time) {
      return "";
    }

    var militaryTime = time.substring(0, 5);
    var militaryHour = parseInt(militaryTime.substring(0,2));
    var standardHour = ((militaryHour + 11) % 12) + 1;
    var amPm = militaryHour > 11 ? 'PM' : 'AM';
    var minutes = militaryTime.substring(3);


    return standardHour + ":" + minutes + amPm;
  };

  const reformatDate = (date) => {
    // Dates that are listed null
    if (!date) {
      return "";
    }

    var yymmdd_format = date.substring(0, 10);
    var year = yymmdd_format.substring(0, 4);
    var month = parseInt(yymmdd_format.substring(5, 7));
    var day = yymmdd_format.substring(8, 10);

    return month + "/" + day + "/" + year;
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
                  Coverage: {`${elem.acre_treated}`} {`${COVERAGE_UNIT}`}
                </Typography>
              </CardContent>
            </Box>

          <CardMedia sx={{ pt:"35px", pb:"25px", flexDirection: "column", width: "20%", display:{ xs: "none" , m: "block", lg: "block" }}}>
            <Stack direction="row" alignItems="center" gap={2}>
              <LocationOnOutlined />
              <Typography variant="body1">
              {`${parseFloat(elem.distance).toFixed(2)}`} {DISTANCE_UNIT}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={2} sx={{pt:"5px"}}>
              <AccessTimeOutlined />
              <Stack direction="column">
                <Typography variant="body1">
                  {`${getStandardTime(elem.applic_time)}`} 
                </Typography>
                <Typography>
                  {`${reformatDate(elem.applic_dt)}`} 
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