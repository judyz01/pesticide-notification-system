/*global google*/
import * as React from 'react';
import axios from 'axios';
import { Box, Button, Input, InputAdornment, Link, Stack, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Circle, GoogleMap, Marker, MarkerClusterer, StandaloneSearchBox, useGoogleMap } from "@react-google-maps/api";
import {Link as RouterLink} from "react-router-dom";
import { withTranslation } from "react-i18next";

// Radius is in meters, currently set to 5 mile radius (8046.72m)
var userRadius = 8046.72;

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 38.53709139783189, lng: -121.75506664377548 },
      markers: [],
      pesticideData: [],
      bounds: null,
      global_map: {},
    };
  }


  // Icon for user's current location
  blueDot = {
    fillColor: "#4285F4",
    fillOpacity: 1,
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: "#FFFFFF",
    strokeWeight: 2,
  };

  // Circular radius that surrounds the user's current location
  options = {
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

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        this.setState({ currentLocation: pos });
      }
    );

    axios.get(`https://noi-notification-system-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
        params: { latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng, radius: userRadius, order: "DESC", orderParam: "" },
    })
    .then(response => 
      this.setState({ pesticideData: response.data }))
    .catch(function (error) {
        console.error(error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.func(this.state.currentLocation);

    if (prevState.currentLocation !== this.state.currentLocation) {

      // Reset pesticide data
      this.setState({ pesticideData: [] });

      axios.get(`https://noi-notification-system-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
        params: { latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng, radius: userRadius, order: "DESC", orderParam: "" },
      })
      .then(response => 
        this.setState({ pesticideData: response.data }))
      .catch(function (error) {
          console.error(error);
      });
    }
  }

  findNearbyLocations = () => {

    // let map = new google.maps.Map(document.getElementById("map"), {
    //   zoom: 12,
    //   center: this.state.currentLocation,
    // });

    var search_types = ["primary_school", "secondary_school", "park", "university", "library"];
    var local_markers = [];

    console.log("NEARBY");

    // Google Places API does not allow you to search for multiple places types at the same time, 
    // so the search_types are called separately through multiple requests
    // for (var i = 0; i < search_types.length; i++) {

    //   const search = {
    //     radius: userRadius,
    //     location: this.state.currentLocation,
    //     bounds: this.state.bounds,
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

    // this.setState({ 
    //   markers: local_markers
    // })

  };

  onMapLoad = (map) => {
    google.maps.event.addListener(map, "bounds_changed", () => {
      this.setState({ bounds: map.getBounds() });
    });

    const legend = document.getElementById("legend");
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

    this.findNearbyLocations();
    console.log("MAP");
  };

  handleChange = (event) => {
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
  calculator = function(markers) {
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
  clusterStyles = {
    imagePath:
      '../images/clusters/m',
  };

  render() {
    const { i18n } = this.props;
    var setLegend = i18n.language === "en" ? "../images/legend_en.svg" : "../images/legend_sp.svg";

    const onLoad = (ref) => {
      this.searchBox = ref;
      // console.log("search bar intiated");
    }

    const onPlacesChanged = () => {
      var placesInfo = this.searchBox.getPlaces();
      console.log("places changed");

      for (let i = 0; i < this.state.markers.length; i++) {
        if (this.state.markers[i]) {
          console.log("deleting markers");
          this.state.markers[i].setMap(null);
        }
      }

      this.setState({ markers: [] });

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
        params: { place_id: placesInfo[0].place_id, key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY },
      })
      .then(response => {
        var coordinates = response.data.results[0].geometry.location;
        var lat = coordinates.lat;
        var lng = coordinates.lng;
  
        this.setState({ currentLocation: { lat, lng } });
      })
      .catch(function (error) {
          console.error(error);
      });

      // this.findNearbyLocations();
    };

    var location = this.state.currentLocation;

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
          id="map"
          center={location}
          zoom={12}
          onLoad={map => this.onMapLoad(map)}
          mapContainerStyle={{ height: "100%", width: "100%" }}
        >

          <Marker icon={this.blueDot} position={location} />
          <Circle
            center={location}
            options={this.options}
          />

          <MarkerClusterer minimumClusterSize={1} calculator={this.calculator} options={this.clusterStyles}>
            {(clusterer) =>
              this.state.pesticideData.map((elem, idx) => (
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
}

export default withTranslation()(MapView);

