import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, CardMedia, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
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

  const convertMilesToMeters = (miles) => {
    return miles * 1609.34;
  };

  const getOrderParams = (order) => {
    switch(order) {
      case 'Most Recent':
        return ["DESC", ""];
      case 'Least Recent':
        return ["ASC", ""];
      case 'Closest':
        return ["ASC", "distance"];
      case 'Furthest':
        return ["DESC", "distance"];
      default:
        return ["ASC", "distance"];
    }
  };

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
  };

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

  const update = () => {

    var stored_coordinates = localStorage.getItem('location');
    var coordinates = props.location ? props.location : stored_coordinates;

    var order = getOrderParams(props.order);
    var radius = props.radius? props.radius : 5;

    console.log("radius is " + props.radius);
    console.log("order rank is " + order[0]);
    console.log("order param is " + order[1]);
    console.log("location lat is " + coordinates.lat);
    console.log("location lng is " + coordinates.lng);


    if (coordinates) {
      axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
          params: { latitude: coordinates.lat, longitude: coordinates.lng, radius: convertMilesToMeters(radius), order: order[0], orderParam: order[1]},
      })
      // axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
      //   params: { latitude: 37.511418, longitude: -120.81, radius: convertMilesToMeters(radius), order: order[0], orderParam: order[1]},
      // })
      .then((response) => {
        setPesticideData(response.data);
        console.log("Pesticide data received for cards");
      })
      .catch(function (error) {
          console.error(error);
      });
    } else {
      console.log("no location found");
    }
  };

  useEffect(update, [props], []);

  // These props hold the data from each of the filters - county is array of strings, order is a string, fumigant is boolean, radius is int
  useEffect(() => {

    // Props intially undefined until filters are used:
      // radius defaulted to 5 miles
      // order defaulted to closest distance 

    if (props.radius) {
      console.log(props.radius);
    } else {
      console.log("No radius specified");
    }

    if (props.county) {
      console.log(props.county);
    } else {
      console.log("No county specified");
    }

    if (props.order) {
      console.log(props.order);
    } else {
      console.log("No order specified");
    }

    if (props.fumigant) {
      console.log(props.fumigant);
    } else {
      console.log("No fumigant specified");
    }

    if (props.location) {
      console.log("location lat from mapview " + props.location.lat);
      console.log("location lng from mapview " + props.location.lng);

      localStorage.setItem('location', JSON.stringify(props.location));

    } else {
      console.log("no location passed from mapview");
    }

  }, [props], []);

  if (!pesticideData) return loadSkeleton();

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
              <Tooltip title="Distance" arrow placement="left">
                <LocationOnOutlined />
              </Tooltip>
              <Typography variant="body1">
              {`${parseFloat(elem.distance).toFixed(2)}`} {DISTANCE_UNIT}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={2} sx={{pt:"5px"}}>
              <Tooltip title="Time/Date" arrow placement="left">
                <AccessTimeOutlined />
              </Tooltip>

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
              <Tooltip title="Application Method" arrow placement="left">
                <WarningAmberOutlined />
              </Tooltip>
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