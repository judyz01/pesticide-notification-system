import React, { useState, useEffect, useRef} from 'react';

import axios from 'axios';
import { useTranslation } from "react-i18next";
import { AccessTimeOutlined, LocationOnOutlined, QrCode2, WarningAmberOutlined}  from '@mui/icons-material';
import {Link, Box, Button, Card, CardContent, CardHeader, CardMedia, Dialog, DialogTitle, IconButton, Pagination, Skeleton, Stack, Tooltip, Typography } from '@mui/material';

import QRCode from "react-qr-code";
import ReactToPrint from 'react-to-print';


function loadSkeleton() {
  return [
    <Skeleton sx={{mb:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
    <Skeleton sx={{m:"15px", borderRadius: "16px"}} animation="wave" variant="rectangular" width="80%" height={150} />,
  ];
}

function SimpleDialog(props) {
  const { onClose, open, qrCoords } = props;
  const QRRef = useRef(null);

  if (!qrCoords.lat  && !qrCoords.lng ) {
    return;
  }

  console.log("qr coords " + qrCoords.lat + " " + qrCoords.lng);

  const handleClose = () => {
    onClose();
  };

  const getPageMargins = () => {
    return `@page { margin: '10px' '10px' '10px '10px' !important; }`;
  };

  var url = "https://pesticidenoi.netlify.app?lat=" + qrCoords.lat + "&lng=" + qrCoords.lng;
  var debug = "http://localhost:3000?lat=" + qrCoords.lat + "&lng=" + qrCoords.lng;
  console.log(url);

  return (
    <Dialog 
      titleStyle={{textAlign: "center"}}
      onClose={handleClose} 
      open={open}                    
    >
      <div ref={QRRef} style={{ background: 'white', padding: '16px', justifyContent:"center", alignItems:"center"}}>
        <DialogTitle textAlign="center"> Scan QR Code </DialogTitle>
          <QRCode
            size={256}
            style={{ width: "100%"}}
            value={url}
            viewBox={`0 0 256 256`}
          />
        </div>


        <ReactToPrint
          pageStyle={getPageMargins}
          // documentTitle = {"Pesticide Notification System"}
          trigger={() => (
            <Button sx={{p: "20px"}} >
              Print QR Code
            </Button>
            )}
          content={() => QRRef.current}>
        </ReactToPrint>

        {/* <Link href={debug}>
          Debug Link
        </Link> */}
    </Dialog>
  );
}


const NOICards = (props) =>  {
  const { t } = useTranslation();

  const TOOLTIP_DISTANCE = t("Tooltip Distance");
  const TOOLTIP_DATE = t("Tooltip Time/Date");
  const TOOLTIP_APPLICATION = t("Tooltip Application");
  const COVERAGE_UNIT = t("acres");
  const DISTANCE_UNIT = t("miles");
  const ADDRESS = t("Address");
  const COVERAGE = t("Coverage");
  const FUMIGANT = t("Fumigant label");
  const NO_NOIS = t("No NOIs");
  const COUNTY = t("County");

  const [pesticideData, setPesticideData] = useState([]);
  const [isDesktop, setDesktop] = useState(true);
  const [isXSMobile, setXSMobile] = useState(true);
  const [qrCoords, setQrCoords] = useState({});
  const [open, setOpen] = useState(false);


  React.useEffect(() => {

    window.innerWidth > 900 ? setDesktop(true) : setDesktop(false);
    window.innerWidth <= 660 ? setXSMobile(true) : setXSMobile(false);

    const updateMedia = () => {
      window.innerWidth > 900 ? setDesktop(true) : setDesktop(false);
      window.innerWidth <= 660 ? setXSMobile(true) : setXSMobile(false);
    };
  
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const itemsPerPage = 10;
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
  };

  const convertMilesToMeters = (miles) => {
    return miles * 1609.34;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const generateQR = (lat, lng) => {
    setQrCoords({lat, lng});
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

  const getApplicatorCharacter = (str) => {
    switch(str) {
      case 'Aerial':
        return 'A';
      case 'Ground':
        return 'B';
      case 'Aerial/Ground':
        return 'C';
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

    if(!props.dontRefresh)
    {
      setPesticideData('');
      setPage(1);

      var stored_coordinates = localStorage.getItem('location');
      var check_coordinates_exist = props.location ? props.location : JSON.parse(stored_coordinates);
      var coordinates = check_coordinates_exist ? check_coordinates_exist : { lat: 38.53709139783189, lng: -121.75506664377548 };

      var order = getOrderParams(props.order);
      var radius = props.radius? props.radius : 5;

      if (coordinates) {

        if (typeof props.county !== 'undefined' && props.county.length > 0) {
          console.log("finding counties");

          var counties = new URLSearchParams();

          counties.append("order", order[0]);
          props.county.forEach((countyIndex, idx) => {
            counties.append("counties", countyIndex);
          });

          axios.get(`https://noi-notification-system-qvo2g2xyga-uc.a.run.app/findCountyNOI`, {
            params: counties,
          })
          .then((response) => {
            console.log(response);
            if (props.fumigant === true) {
              const filteredData = response.data.filter(elem => elem.fumigant_sw === 'X');
              setPesticideData(filteredData);
            } else if (props.aerialGround) {
              const filteredData = response.data.filter(elem => elem.aer_grnd_ind === getApplicatorCharacter(props.aerialGround));
              setPesticideData(filteredData);
            } else {
              setPesticideData(response.data);
            }
          })
          .catch(function (error) {
              console.error(error);
          });

        } else {
          console.log("finding current location");

          axios.get(`https://noi-notification-system-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
              params: { latitude: coordinates.lat, longitude: coordinates.lng, radius: convertMilesToMeters(radius), order: order[0], orderParam: order[1]},
          })
          .then((response) => {
            console.log(response);
            if (props.fumigant === true) {
              const filteredData = response.data.filter(elem => elem.fumigant_sw === 'X');
              setPesticideData(filteredData);
            } else if (props.aerialGround) {
              const filteredData = response.data.filter(elem => elem.aer_grnd_ind === getApplicatorCharacter(props.aerialGround));
              setPesticideData(filteredData);
            } else {
              setPesticideData(response.data);
            }
          })
          .catch(function (error) {
              console.error(error);
          });
        }
      }
    };
  };

  useEffect(update, [props], []);

  // These props hold the data from each of the filters - county is array of strings, order is a string, fumigant is boolean, radius is int
  useEffect(() => {
    props.location &&
      localStorage.setItem('location', JSON.stringify(props.location));

    // console.log("Fumigant " + props.fumigant);
    // console.log("Aerial/Ground " + props.aerialGround);
    // console.log(props.county);
    console.log(props.startDate);
    console.log(props.endDate);

  }, [props], []);

  const iconMedia = (elem) => {
    return(
      <>
        
        <Stack direction="row" alignItems="center" gap={2}> 


          <Tooltip title={TOOLTIP_DISTANCE} arrow placement="left">
            <LocationOnOutlined />
          </Tooltip>

          { 
          elem.distance ?
            <Typography variant="body1">
            {`${parseFloat(elem.distance).toFixed(2)}`} {DISTANCE_UNIT}
            </Typography> 
            :
            <Typography variant="body1">
              {elem.county_name} {COUNTY}
            </Typography> 
          }

        </Stack>
        <Stack direction="row" alignItems="center" gap={2} sx={{pt:"5px"}}>
          <Tooltip title={TOOLTIP_DATE}  arrow placement="left">
            <AccessTimeOutlined />
          </Tooltip>

          <Stack direction="column">

            {/* Desktop View: time & date formatted vertically */}
            { isDesktop &&
              <>
              <Typography variant="body1">
                {`${getStandardTime(elem.applic_time)}`}
              </Typography>
              <Typography>
                {`${reformatDate(elem.applic_dt)}`} 
              </Typography>
              </>
            }

            {/* 
              Mobile View: 
                XS+: time & date formatted horizontally
                XS or below: time & date formatted vertically
            */}
            { !isDesktop &&
              (!isXSMobile ? 
                // XS+
                <Typography variant="body1">
                  {`${getStandardTime(elem.applic_time)}`}, &nbsp; {`${reformatDate(elem.applic_dt)}`} 
                </Typography>
              :
                // XS or below
                <>
                <Typography variant="body1">
                  {`${getStandardTime(elem.applic_time)}`}
                </Typography>
                <Typography>
                  {`${reformatDate(elem.applic_dt)}`} 
                </Typography>
                </>
              )
            }
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
      </>
    );
  }

  if (!pesticideData) return loadSkeleton();

  return (
    <>
      {/* NOICards format is in a column */}
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

          <Card key={index} sx={{ display:"flex", width: "80%", borderRadius: "16px", justifyContent: "space-between", flexDirection:{ sm:"column", md:"row"} }}>
              <Box sx={{ flexDirection: "column" }}>

              <Stack direction="row">
                  <CardHeader
                    title={`${elem.product_name}`}
                    sx={{pb:0, pr:0}}
                  />

                  <IconButton sx={{mt:"15px"}} aria-label="qr_code" onClick={() => { handleClickOpen(); generateQR(elem.latitude, elem.longitude);}}>
                    <QrCode2 />
                  </IconButton>
                </Stack>

                {/* 
                  Mobile view: icons are shown sandwiched in between CardHeader and CardContent 
                    XS+: icons formatted horizontally
                    XS or below: icons formatted vertically
                */}
                {!isDesktop &&
                  (!isXSMobile ? 
                    // XS+
                    <CardMedia sx={{ pl:"20px", pt:"10px", flexDirection: "row", width: "80%", minWidth: "520px", justifyContent:"space-between"}}>
                      <Stack direction="row" gap={3}>
                        {iconMedia(elem) }
                      </Stack>
                    </CardMedia>

                  :
                    // XS or below
                    <CardMedia sx={{ p:"20px", flexDirection: "column", width: "80%", justifyContent:"space-between"}}>
                      {iconMedia(elem) }
                    </CardMedia>
                  )
                }

                <CardContent>
                  <Typography variant="h11" color="#A5ADBB">
                    {ADDRESS}: {`${elem.latitude}`}, {`${elem.longitude}`}
                  </Typography>

                  <Typography color="#A5ADBB">
                    {COVERAGE}: {`${elem.acre_treated}`} {`${COVERAGE_UNIT}`}
                  </Typography>

                  <Typography color="#A5ADBB">
                    {FUMIGANT}: {`${elem.fumigant_sw === 'X' ? "Yes" : "No"}`}
                  </Typography>
                </CardContent>
              </Box>

              {/* Desktop View: Icons shows on right side of the card, vertically */}
              {isDesktop && 
              <CardMedia sx={{ pt:"35px", pb:"25px", flexDirection: "column", width: "22%", display: "block"}}>
                  {iconMedia(elem)}
              </CardMedia>
              }
          </Card> 
        )) : 
          <Typography align="center" sx={{width:"80%", fontSize: 18, fontWeight: 500, color: "#126701"}}>
            {NO_NOIS}
          </Typography>
        }

        {(pesticideData.length > 0) &&
          <Pagination 
              count={Math.ceil(pesticideData.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
        }
      </Stack>
      
      {/* Dialog has to be outside everything to prevent black background bug */}
      <SimpleDialog
        qrCoords = {qrCoords}
        open={open}
        onClose={handleClose}
      />
    </>
  );

}

export default NOICards;