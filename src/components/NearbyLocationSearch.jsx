import React from 'react'
import { GoogleMap, useGoogleMap } from '@react-google-maps/api'

// const findNearbyLocations = () => {
//   var search_types = ["primary_school", "secondary_school", "park", "university", "library"];
//   var local_markers = [];

//   console.log("NEARBY LOCATION SEARCH");

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
// };

function NearbyLocationSearch() {
  const map = useGoogleMap();

  React.useEffect(() => {
    if (map) {
      console.log("AAAA");
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

  // setMarkers(local_markers);
    }
  }, [map])

  return null
}

export default NearbyLocationSearch;
