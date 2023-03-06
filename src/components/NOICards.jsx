import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { AccessTimeOutlined, LocationOnOutlined, WarningAmberOutlined}  from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, CardMedia, Pagination, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

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

  const TOOLTIP_DISTANCE = t("Tooltip Distance");
  const TOOLTIP_DATE = t("Tooltip Time/Date");
  const TOOLTIP_APPLICATION = t("Tooltip Application");
  const COVERAGE_UNIT = t("acres");
  const DISTANCE_UNIT = t("miles");
  const NO_NOIS = t("No NOIs");

  const [pesticideData, setPesticideData] = useState('');

  const itemsPerPage = 10;
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
  };

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

    // var stored_coordinates = localStorage.getItem('location');
    // var coordinates = props.location ? props.location : JSON.parse(stored_coordinates);
    var coordinates = props.location;

    var order = getOrderParams(props.order);
    var radius = props.radius? props.radius : 5;

    // console.log("radius is " + radius);
    // console.log("order rank is " + order[0]);
    // console.log("order param is " + order[1]);
    // console.log("location lat is " + coordinates.lat);
    // console.log("location lng is " + coordinates.lng);

    if (coordinates) {
      axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
          params: { latitude: coordinates.lat, longitude: coordinates.lng, radius: convertMilesToMeters(radius), order: order[0], orderParam: order[1]},
      })
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
    // props.location ?
    //   localStorage.setItem('location', JSON.stringify(props.location))
    //   : console.log("no location passed from mapview");

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
      {/* If we don't have any data to show, then the view will show "No NOIs" and pagination will be hidden */}
      {(pesticideData.length > 0) ? pesticideData
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((elem, index) => (
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

          <CardMedia sx={{ pt:"35px", pb:"25px", flexDirection: "column", width: "22%", display:{ xs: "none" , lg: "block"}}}>
            <Stack direction="row" alignItems="center" gap={2}>
              <Tooltip title={TOOLTIP_DISTANCE} arrow placement="left">
                <LocationOnOutlined />
              </Tooltip>
              <Typography variant="body1">
              {`${parseFloat(elem.distance).toFixed(2)}`} {DISTANCE_UNIT}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={2} sx={{pt:"5px"}}>
              <Tooltip title={TOOLTIP_DATE}  arrow placement="left">
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
              <Tooltip title={TOOLTIP_APPLICATION}  arrow placement="left">
                <WarningAmberOutlined />
              </Tooltip>
              <Typography variant="body1">
              {`${getApplicatorType(elem.aer_grnd_ind)}`}
              </Typography>
            </Stack>

          </CardMedia>
        </Card> 
      )) : 
        <Typography sx={{fontSize: 18, fontWeight: 500, color: "#126701"}}>
          {NO_NOIS}
        </Typography>
      }

      {(pesticideData.length > 0) ?
        <Pagination
            count={Math.ceil(pesticideData.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            defaultPage={1}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          /> : ""
      }
    </Stack>
  );

}

export default NOICards;