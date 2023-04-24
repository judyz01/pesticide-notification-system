/*global google*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Input, InputAdornment, Link, Stack, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Circle, GoogleMap, Marker, MarkerClusterer, StandaloneSearchBox } from "@react-google-maps/api";
import {Link as RouterLink} from "react-router-dom";
// import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";

import NearbyLocationSearch from "./NearbyLocationSearch";

// Radius is in meters, currently set to 5 mile radius (8046.72m)
var userRadius = 8046.72;

function RefactoredMapView(props) {

  const [currentLocation, setCurrentLocation] = useState({ lat: 38.53709139783189, lng: -121.75506664377548 });
  const [markers, setMarkers] = useState([]);
  const [pesticideData, setPesticideData] = useState([]);
  const [searchBox, setSearchBox] = useState(null);

  const [bounds, setBounds] = useState(null);

  // const { i18n } = props;
  const { t } = useTranslation();
  var setLegend = t.language === "en" ? "../images/legend_en.svg" : "../images/legend_sp.svg";

  const findNearbyLocations = () => {
    var search_types = ["primary_school", "secondary_school", "park", "university", "library"];
    var local_markers = [];

    console.log("NEARBY LOCATION SEARCH");
  
    // Google Places API does not allow you to search for multiple places types at the same time, 
    // so the search_types are called separately through multiple requests

    // for (let i = 0; i < search_types.length; i++) {
    //   const search = {
    //     radius: userRadius,
    //     location: currentLocation,
    //     bounds: bounds,
    //     types: [search_types[i]],
    //   };
  
    //   let places = new google.maps.places.PlacesService(map);
  
    //   places.nearbySearch(search, (results, status, pagination) => {
    //     if (status === google.maps.places.PlacesServiceStatus.OK && results) {
  
    //       for (let i = 0; i < results.length; i++) {
    //         const markerIcon = "../images/highlight_marker.png"
  
    //         let marker = new google.maps.Marker({
    //             position: results[i].geometry.location,
    //             animation: google.maps.Animation.DROP,
    //             icon: markerIcon,
    //         });
  
    //         marker.setMap(map);
    //         local_markers.push(marker);
    //       }
    //     }
    //   });
    // }
  
    // // this.setState({ 
    // //   markers: local_markers
    // // })

    // setMarkers(local_markers);
  };

  const onPlacesChanged = () => {
    var placesInfo = searchBox.getPlaces();

    for (let i = 0; i < markers.length; i++) {
      if (markers[i]) {
        console.log("deleting markers");
        markers[i].setMap(null);
      }
    }

    setMarkers([]);

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
      params: { place_id: placesInfo[0].place_id, key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY },
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setCurrentLocation(pos);
      }
    );

    axios.get(`https://noi-notification-system-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
        params: { latitude: currentLocation.lat, longitude: currentLocation.lng, radius: userRadius, order: "DESC", orderParam: "" },
    })
    .then(response => 
      setPesticideData(response.data))
    .catch(function (error) {
        console.error(error);
    });
  }, []);
  
  useEffect(() => {
    props.func(currentLocation);
    // Reset pesticide data
    setPesticideData([]);

    console.log("getting data");

    axios.get(`https://noi-notification-system-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
      params: { latitude: currentLocation.lat, longitude: currentLocation.lng, radius: userRadius, order: "DESC", orderParam: "" },
    })
    .then(response => 
      setPesticideData(response.data))
    .catch(function (error) {
        console.error(error);
    });
  }, [currentLocation]);
  
  const onMapLoad = (map) => {
    google.maps.event.addListener(map, "bounds_changed", () => {
      setBounds(map.getBounds());
    });

    const legend = document.getElementById("legend");
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

    findNearbyLocations();
    console.log("MAP");
  };

  const onLoad = (ref) => {
    setSearchBox(ref);
  }

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

  return (
    <Box sx={{ mt: "15px", height:"575px", width:"80%", display: { xs: "block", sm: "block" } }}>
      <Stack   
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{pb:"15px" }}
      >

        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <TextField 
            id="search_box" 
            label="Enter Address" 
            variant="outlined" 
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

        <Button sx={{ 
            display: "flex",
            height: "40px",
            p: "16px",
            variant:"contained", 
            backgroundColor:"#d0342c", 
            color:"white",
            "&:hover": {
              backgroundColor: "#d0342c",
              "@media (hover: none)": {
                backgroundColor: "#d0342c",
                "&:active": {
                  backgroundColor: "#d0342c"
                }
              }}
            }}
        >
          <Link style={{textDecoration: "none", color: "white"}} component={RouterLink} to={`/Resources`}>
              EMERGENCY
          </Link>
        </Button> 

      </Stack>
        <GoogleMap 
        center={currentLocation}
        zoom={12}
        onLoad={map => onMapLoad(map)}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        >

        <NearbyLocationSearch/>

        <Marker icon={blueDot} position={currentLocation} />
        <Circle
          center={currentLocation}
          options={options}
        />

        <MarkerClusterer minimumClusterSize={1} calculator={calculator} options={clusterStyles}>
          {(clusterer) =>
            pesticideData.map((elem, idx) => (
              <Marker key={idx} position={ {lat: parseFloat(elem.latitude), lng: parseFloat(elem.longitude)} } 
                      clusterer={clusterer} />
            ))
          }
        </MarkerClusterer>

        <div id="legend">
          <div>
            <img src={setLegend} alt="map-legend"/>
          </div>
        </div>

      </GoogleMap>
    </Box>
  );
}
export default RefactoredMapView;
