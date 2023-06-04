/*global google*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, IconButton, Input, InputAdornment, Stack, TextField } from "@mui/material";
import {QrCode2}  from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Circle, GoogleMap, Marker, MarkerClusterer, StandaloneSearchBox } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { convertMilesToMeters } from "../helpers/functions"
import SimpleDialog from "./SimpleDialog";

function RefactoredMapView(props) {

  // If not from QR code, then use default coordinates for pesticide data until current location is found
  const [currentLocation, setCurrentLocation] = useState(() => (props.lat && props.lng) ? {lat: parseFloat(props.lat), lng: parseFloat(props.lng)} : {lat: 38.53709139783189, lng: -121.75506664377548});

  const [pesticideData, setPesticideData] = useState([]);
  const [searchBox, setSearchBox] = useState(null);
  const [address, setAddress] = useState(null);
  const [qrCoords, setQrCoords] = useState({});
  const [open, setOpen] = useState(false);

  const { i18n, t } = useTranslation();

  // Radius is in meters, currently set to 5 mile radius (8046.72m)
  var userRadius = (props.lat && props.lng) ? 250: props.radius ? convertMilesToMeters(props.radius) : 8046.72;
  console.log("radius is " + userRadius);
  console.log("props radius is " + props.radius);

  var zoomDict = {8046.7: 12, 16093.4: 11, 24140.1: 10}

  var setLegend = i18n.language === "en" ? "../images/legend_en.svg" : "../images/legend_sp.svg";
  const ENTER_ADDRESS = t("Enter Address");

  // Icon for user's current location
  const blueDot = {
    fillColor: "#4285F4",
    fillOpacity: 1,
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: "#FFFFFF",
    strokeWeight: 2,
  };

  // Circular radius that surrounds the user's current location
  const options = {
    strokeColor: '#4285F4',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#4285F4',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: userRadius,
    zIndex: 1
  };

  /* 
  Calculator determines which index (color) the cluster marker is going to be
  Currently have the index change by increments of 50:
    0-49: Green
    50-99: Yellow
    100-149: Orange
    150-199: Red
    200+: Purple
*/
  const calculator = function(markers) {
    const INCREMENT = 50;
    var index = 0;
    var count = markers.length;

    for (var i=0; i<=count; i+=INCREMENT) {
      index++;
    }
  
    return {
      text: count,
      index: index
    };
  };

  // Set custom icons for marker clusters
  const clusterStyles = {
    imagePath:
      '../images/clusters/m',
  };

  // QR Icon Button
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateQR = () => {
    setQrCoords(currentLocation);
  };

  const getPesticideData = ((lat, lng) => {

    if (!lat && !lng) {
      console.log("can't get pesticide data");
      return;
    }

    // Set pesticide date according to user's location
    axios.get(`https://noi-notification-system-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
        params: { latitude: lat, longitude: lng, radius: userRadius, map: true},
    })
    .then(response =>
      setPesticideData(response.data))
    .catch(function (error) {
        console.error(error);
    });
  });
    
  // Used once on mount
  useEffect(() => {

    if (!(props.lat && props.lng)) {
      // Find current position of user
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          const pos = { lat, lng };
          console.log("found current location");
          setCurrentLocation(pos);
        }
      );
    }

    console.log(currentLocation.lat, currentLocation.lng);

    getPesticideData(currentLocation.lat, currentLocation.lng);
  }, []);
  
  // Updates everytime the user's location changes
  useEffect(() => {
    console.log("curr location changed " + currentLocation.lat + " " + currentLocation.lng);
    // Reset pesticide data
    setPesticideData([]);

    // Pass location to Home and then NOI Cards
    props.func(currentLocation);

    // Get pesticide data
    getPesticideData(currentLocation.lat, currentLocation.lng);

  }, [props, currentLocation]);

  // const findPlaceFromCoords = (lat, lng) => {
  //   var lat_lng = lat + ", " + lng;
  //   console.log(lat_lng);
  //   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
  //     params: { latlng: lat_lng , key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY },
  //   })
  //   .then(({data}) => {
  //       setAddress(data.results[2].formatted_address);
  //   });
  // };

  // Receive new location from search box, converts it to lat/long coordinates
  // Uses new coordinates to obtain pesticide data
  const onPlacesChanged = (placeID) => {

    var place =  placeID ? placeID : searchBox.getPlaces()[0].place_id;

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
      params: { place_id: place, key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY },
    })
    .then(response => {
      var coordinates = response.data.results[0].geometry.location;
      var lat = coordinates.lat;
      var lng = coordinates.lng;

      setCurrentLocation({lat, lng});

    })
    .catch(function (error) {
        console.error(error);
    });
  };

  const onMapLoad = (map) => {

    const legend = document.getElementById("legend");
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

  };

  const onLoad = (ref) => {
    setSearchBox(ref);
  }

  return (
    <>
    <Box sx={{ mt: "15px", height:"575px", width:"80%", display: { xs: "block", sm: "block" } }}>
      <Stack   
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{pb:"15px"}}
      >
        <Stack direction="row"> 
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <TextField 
              id="search_box" 
              sx={{width:"100%"}}
              label={ENTER_ADDRESS} 
              variant="outlined" 
              // value={address? address : ""}
              placeholder=""
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                )
              }} >
              <Input />
            </TextField>
          </StandaloneSearchBox>

          <IconButton aria-label="qr_code" onClick={() => { handleClickOpen(); generateQR();}}>
            <QrCode2 fontSize="large" opacity="0.8"/>
          </IconButton>
        </Stack>

      </Stack>
        <GoogleMap 
          center={currentLocation}
          zoom={(props.lat && props.lng) ? 18 : zoomDict[convertMilesToMeters(props.radius)] ? zoomDict[convertMilesToMeters(props.radius)] : 12}
          onLoad={map => {onMapLoad(map)}}
          mapContainerStyle={{ height: "100%", width: "100%" }}
        >

        <Marker icon={blueDot} position={currentLocation} />
        <Circle
          center={currentLocation}
          options={options}
        />

        <MarkerClusterer minimumClusterSize={1} calculator={calculator} noRedraw={true} options={clusterStyles}>
          {(clusterer) =>
            (pesticideData.length > 0) ? pesticideData.map((elem, idx) => (
              <Marker key={idx} position={ {lat: parseFloat(elem.latitude), lng: parseFloat(elem.longitude)} } 
                      clusterer={clusterer} />
            )) : clusterer.clearMarkers()
          }
        </MarkerClusterer>

        <div id="legend">
          <div>
            <img src={setLegend} alt="map-legend"/>
          </div>
        </div>

      </GoogleMap>
    </Box>

    {/* Dialog has to be outside everything to prevent black background bug */}
    <SimpleDialog
      qrCoords = {qrCoords}
      open={open}
      onClose={handleClose}
    />
    </>
  );
}
export default RefactoredMapView;
