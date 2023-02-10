import React from "react";
import { Box } from '@mui/material';
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import GoogleMapReact from 'google-map-react';


export default function MapView() {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  // });

  // if (!isLoaded) return <div>Loading...</div>;
  // console.log("loaded map");
  // return <Map />;

  const defaultProps = {
    center: {
      lat: 38.5373,
      lng: -121.7617
    },
    zoom: 11
  };

  return (
    <Box sx={{ mt: "25px", height:"542px", width:"873px", display: { xs: "none", sm: "block" } }}>
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
        </GoogleMapReact>
      </div>
    </Box>



  );
}

// function Map() {
//   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

//   return (
//     // <Box sx={{ mt: "25px", height:"542px", width:"873px", display: { xs: "none", sm: "block" } }}>
//     //   <div style={{ height: '100vh', width: '100%' }}>
//     //   <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//     //     <Marker position={center} />
//     //   </GoogleMap>
//     //   </div>
//     // </Box>

//     <div style={{ height: '500px', width: '500px' }}>
//     <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//       <Marker position={center} />
//     </GoogleMap>
//     </div>
      
//   );
// };

