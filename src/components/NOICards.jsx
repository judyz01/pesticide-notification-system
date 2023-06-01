import React, { useState, useEffect} from 'react';

import axios from 'axios';
import { useTranslation } from "react-i18next";
import { AccessTimeOutlined, LocationOnOutlined, QrCode2, WarningAmberOutlined}  from '@mui/icons-material';
import { Link, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Pagination, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { convertMilesToMeters, getOrderParams, getApplicatorCharacter, getStandardTime, reformatDate} from "../helpers/functions"
import SimpleDialog from "./SimpleDialog";


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

  // Pagination
  const handleChange = (event, value) => {
    setPage(value);
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
  };

  // QR Icon Button
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Dialog
  const handleClose = () => {
    setOpen(false);
  };

  const generateQR = (lat, lng) => {
    setQrCoords({lat, lng});
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

  const update = () => {

    if(!props.dontRefresh)
    {
      setPesticideData('');
      setPage(1);

      var stored_coordinates = localStorage.getItem('location');
      var check_coordinates_exist = props.location ? props.location : JSON.parse(stored_coordinates);
      var coordinates = check_coordinates_exist ? check_coordinates_exist : { lat: 38.53709139783189, lng: -121.75506664377548 };

      var order = props.order? getOrderParams(props.order) : getOrderParams(props.distance_order);

      var radius = props.radius? props.radius : 5;

      var startDate = "";
      var endDate = "";

      if(props.startDate && props.endDate && (props.startDate.$d < props.endDate.$d)) {
        startDate = dayjs(props.startDate.$d).format('YYYY-MM-DD');
        endDate = dayjs(props.endDate.$d).format('YYYY-MM-DD');
      }

      if (typeof props.county !== 'undefined' && props.county.length > 0) {
        console.log("finding counties");

        var counties = new URLSearchParams();

        counties.append("order", order[0]);
        props.county.forEach((countyIndex, idx) => {
          counties.append("counties", countyIndex);
        });

        counties.append("startDate", startDate);
        counties.append("endDate", endDate);


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
            params: { latitude: coordinates.lat, longitude: coordinates.lng, radius: convertMilesToMeters(radius), order: order[0], orderParam: order[1], startDate: startDate, endDate: endDate},
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

    };
  };

  useEffect(update, [props], []);

  // These props hold the data from each of the filters - county is array of strings, order is a string, fumigant is boolean, radius is int
  useEffect(() => {
    props.location &&
      localStorage.setItem('location', JSON.stringify(props.location));

    // console.log(props.order);

    // console.log("Fumigant " + props.fumigant);
    // console.log("Aerial/Ground " + props.aerialGround);
    // console.log(props.county);
    // console.log(props.startDate);
    // console.log(props.endDate);

    console.log(props.distance_order);


    // console.log(dayjs(props.startDate.$d).format('YYYY-MM-DD'));
    // console.log(dayjs(props.endDate.$d).format('YYYY-MM-DD'));
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

                  {elem.product_label_link ? 
                    <Link underline="hover" href={`${elem.product_label_link}`}>
                      <CardHeader
                        title={`${elem.product_name}`}
                        sx={{pb:0, pr:0}}
                      />
                    </Link>
                    :
                    <CardHeader
                      title={`${elem.product_name}`}
                      sx={{pb:0, pr:0}}
                    />
                  }
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

                  <Typography variant="h11" color="#A5ADBB" alignItems="center">
                    {ADDRESS}
                      <IconButton sx={{ml:"-5px", mr:"-8px"}} aria-label="qr_code" onClick={() => { handleClickOpen(); generateQR(elem.latitude, elem.longitude);}}>
                        <QrCode2 opacity="0.8"/>
                      </IconButton>
                    : {`${elem.latitude}`}, {`${elem.longitude}`}
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