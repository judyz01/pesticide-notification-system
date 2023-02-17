/*global google*/
import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

class MapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 38.53709139783189, lng: -121.75506664377548 },
      markers: [],
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

    return (
      <Box sx={{ mt: "25px", height:"542px", width:"80%", display: { xs: "block", sm: "block" } }}>
          <GoogleMap
            center={this.state.currentLocation}
            zoom={17}
            onLoad={map => this.onMapLoad(map)}
            mapContainerStyle={{ height: "100%", width: "100%" }}
          >

            <Marker icon={this.blueDot} position={this.state.currentLocation} />
          </GoogleMap>

          <div id="legend">
            <div>
              <img src="../images/legend.svg"/>
            </div>
          </div>
      </Box>
    );
  }
}

export default MapView;

