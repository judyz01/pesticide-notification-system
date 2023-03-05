/*global google*/
import * as React from 'react';
import { Circle, GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import { Box } from "@mui/material";

import axios from 'axios';

// Demo imports
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

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

  componentDidUpdate(prevProps, prevState) {
    var location = this.state.demo ? DEMO_LOCATION : this.state.currentLocation;
    this.props.func(location);

    if (prevState.demo !== this.state.demo) {
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

  componentDidMount() {

    // Returns as a string, we need to set it to a boolean
    // const demo_str = localStorage.getItem('demo');
    // const demo_bool = demo_str === "true" ? true : false;
    // this.setState({ demo: demo_bool });

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

  blueDot = {
    fillColor: "#4285F4",
    fillOpacity: 1,
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: "#FFFFFF",
    strokeWeight: 2,
  };

  onMapLoad = map => {
    google.maps.event.addListener(map, "bounds_changed", () => {
      this.setState({ bounds: map.getBounds() });
    });

    const legend = document.getElementById("legend");
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
  };

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

  handleChange = (event) => {
    // localStorage.setItem('demo', !this.state.demo);
    this.setState({ demo: !this.state.demo });
  };

  render() {

    console.log("Expected number of markers");
    console.log(this.state.pesticideData.length);

    var location = this.state.demo ? DEMO_LOCATION : this.state.currentLocation;

    return (
      <Box sx={{ mt: "25px", height:"542px", width:"80%", display: { xs: "block", sm: "block" } }}>
          <GoogleMap
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

            <MarkerClusterer minimumClusterSize={1}>
              {(clusterer) =>
                this.state.pesticideData.map((elem) => (
                  <Marker position={ {lat: parseFloat(elem.latitude), lng: parseFloat(elem.longitude)} } 
                          clusterer={clusterer} />
                ))
              }
            </MarkerClusterer>


            <div id="legend">
              <div>
                <img src="../images/legend.svg"/>
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

export default MapView;

