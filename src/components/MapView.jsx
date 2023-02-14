/*global google*/
import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";


class MapView extends React.Component {
  state = {
    currentLocation: { lat: 0, lng: 0 },
    markers: [],
    bounds: null
  };

  blueDot = {
    fillColor: "#4285F4",
    fillOpacity: 1,
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: "#FFFFFF",
    strokeWeight: 2,
  };

  onMapLoad = map => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        this.setState({ currentLocation: pos });
      }
    );
    google.maps.event.addListener(map, "bounds_changed", () => {
      this.setState({ bounds: map.getBounds() });
    });
  };

  render() {
    return (
      <Box sx={{ mt: "25px", height:"542px", width:"80%", display: { xs: "none", sm: "block" } }}>

          <GoogleMap
            center={this.state.currentLocation}
            zoom={17}
            onLoad={map => this.onMapLoad(map)}
            mapContainerStyle={{ height: "100%", width: "100%" }}
          >

            <Marker icon={this.blueDot} position={this.state.currentLocation} />

          </GoogleMap>

      </Box>
    );
  }
}

export default MapView;

