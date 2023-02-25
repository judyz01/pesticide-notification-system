/*global google*/
import React from "react";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import { Box } from "@mui/material";

import axios from 'axios';

// Radius is in meters
var currRadius = 1000000;
class MapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 38.53709139783189, lng: -121.75506664377548 },
      markers: [],
      pesticideData: [],
      bounds: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        this.setState({ currentLocation: pos });
      }
    );

    axios.get(`https://find-nearby-noi-qvo2g2xyga-uc.a.run.app/findNearbyNOI`, {
        params: { latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng, radius: currRadius },
    })
    .then(response => 
      this.setState({ pesticideData: response.data }))
    .catch(function (error) {
        console.error(error);
    });
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


  render() {

    console.log("Expected number of markers");
    console.log(this.state.pesticideData.length);

    // console.log("Data");
    // console.log(this.state.pesticideData);
    // console.log(this.state.currentLocation.lat);
    // console.log(this.state.currentLocation.lng);

    return (
      <Box sx={{ mt: "25px", height:"542px", width:"80%", display: { xs: "block", sm: "block" } }}>
          <GoogleMap
            center={this.state.currentLocation}
            zoom={17}
            onLoad={map => this.onMapLoad(map)}
            mapContainerStyle={{ height: "100%", width: "100%" }}
          >

            <Marker icon={this.blueDot} position={this.state.currentLocation} />
            
            {/* Previous attempt at generating markers with the long and lat values, problem is there are duplicate coordinates so clusters were used (below) */}
            {/* {this.state.pesticideData.map((elem) => (
              <Marker position={ {lat: parseFloat(elem.latitude), lng: parseFloat(elem.longitude)} } />
            ))} */}

            <MarkerClusterer>
              {(clusterer) =>
                this.state.pesticideData.map((elem) => (
                  <Marker position={ {lat: parseFloat(elem.latitude), lng: parseFloat(elem.longitude)} } clusterer={clusterer} />
                ))
              }
            </MarkerClusterer>


            <div id="legend">
              <div>
                <img src="../images/legend.svg"/>
              </div>
            </div>
          </GoogleMap>
      </Box>
    );
  }
}

export default MapView;

