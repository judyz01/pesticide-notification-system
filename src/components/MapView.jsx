/*global google*/
import * as React from 'react';

import axios from 'axios';
import { Box } from "@mui/material";
import { Circle, GoogleMap, Marker, MarkerClusterer, StandaloneSearchBox, useGoogleMap } from "@react-google-maps/api";
import { withTranslation } from "react-i18next";

// Demo imports
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

// Radius is in meters, currently set to 5 mile radius (8046.72m)
var userRadius = 8046.72;
const DEMO_LOCATION = { lat: 37.511418, lng: -120.81 };
class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 38.53709139783189, lng: -121.75506664377548 },
      markers: [],
      pesticideData: [],
      bounds: null,
      demo: false
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

    // Returns as a string, we need to set it to a boolean
    const demo_str = localStorage.getItem('demo');
    const demo_bool = demo_str === "true" ? true : false;
    this.setState({ demo: demo_bool });

    if (this.state.demo) {
      axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
        params: { latitude: DEMO_LOCATION.lat, longitude: DEMO_LOCATION.lng, radius: userRadius, order: "DESC", orderParam: "" },
      })
      .then(response => 
        this.setState({ pesticideData: response.data }))
      .catch(function (error) {
          console.error(error);
      });

    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          const pos = { lat, lng };
          this.setState({ currentLocation: pos });
        }
      );
  
      axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
          params: { latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng, radius: userRadius, order: "DESC", orderParam: "" },
      })
      .then(response => 
        this.setState({ pesticideData: response.data }))
      .catch(function (error) {
          console.error(error);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var location = this.state.demo ? DEMO_LOCATION : this.state.currentLocation;
    this.props.func(location);

    // console.log("LOCATION UPDATED");
    // console.log(location);

    if (prevState.currentLocation !== this.state.currentLocation) {
      console.log("LOCATION SEARCHING");


      // Reset pesticide data
      this.setState({ pesticideData: [] });

      axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
        params: { latitude: location.lat, longitude: location.lng, radius: userRadius, order: "DESC", orderParam: "" },
      })
      .then(response => 
        this.setState({ pesticideData: response.data }))
      .catch(function (error) {
          console.error(error);
      });
    }
  }


  onMapLoad = map => {
    google.maps.event.addListener(map, "bounds_changed", () => {
      // console.log(map.getBounds());
      this.setState({ bounds: map.getBounds() });
    });

    const legend = document.getElementById("legend");
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

    var search_types = ["primary_school", "secondary_school", "park", "university", "library"];

    // Google Places API does not allow you to search for multiple places types at the same time, 
    // so the search_types are called separately through multiple requests
    for (var i = 0; i < search_types.length; i++) {

      const search = {
        radius: userRadius,
        location: this.state.demo ? DEMO_LOCATION : this.state.currentLocation,
        bounds: map.getBounds(),
        types: [search_types[i]],
      };

      console.log(search.types);

      let places = new google.maps.places.PlacesService(map);

      places.nearbySearch(search, (results, status, pagination) => {
        console.log("searching nearby locations");

        if (status === google.maps.places.PlacesServiceStatus.OK && results) {

          // const results = document.getElementById("results");
          // while (results.childNodes[0]) {
          //   results.removeChild(results.childNodes[0]);
          // }

          for (let i = 0; i < this.state.markers.length; i++) {
            if (this.state.markers[i]) {
              this.state.markers[i].setMap(null);
            }
          }
        
          this.state.markers = [];

          for (let i = 0; i < results.length; i++) {
            const markerIcon = "../images/highlight_marker.png"

            this.state.markers[i] = new google.maps.Marker({
              position: results[i].geometry.location,
              animation: google.maps.Animation.DROP,
              icon: markerIcon,
            });

            this.state.markers[i].setMap(map);
          }
        }
      });
    }

  };

  // boundsChanged = (map) => {
    
  // };

  handleChange = (event) => {
    localStorage.setItem('demo', !this.state.demo);
    this.setState({ demo: !this.state.demo });
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
      console.log("search bar intiated");
    }

    const onPlacesChanged = () => {
      // console.log("Places changed to:");
      // console.log(this.searchBox.getPlaces());
      var placesInfo = this.searchBox.getPlaces();

      console.log("places id: " + placesInfo[0].place_id);

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
      

    };

    var location = this.state.demo ? DEMO_LOCATION : this.state.currentLocation;

    return (
      <Box sx={{ mt: "15px", height:"575px", width:"80%", display: { xs: "block", sm: "block" } }}>
        <Box sx={{pb:"15px"}}>
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Enter Address"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: '150px',
                height: `32px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `16px`,
                outline: `none`,
                textOverflow: `ellipses`
              }}
            />
          </StandaloneSearchBox>

        </Box>
          <GoogleMap
          center={location}
          zoom={12}
          onLoad={map => this.onMapLoad(map)}
          // onBoundsChanged={map => this.boundsChanged(map)}
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

        <FormGroup>
          <FormControlLabel onChange={this.handleChange} control={<Switch checked={this.state.demo} />} label="Demo" />
        </FormGroup>
      </Box>
    );
  }
}

export default withTranslation()(MapView);

