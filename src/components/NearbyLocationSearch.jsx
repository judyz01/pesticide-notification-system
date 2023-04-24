import React from 'react'
import { GoogleMap, useGoogleMap } from '@react-google-maps/api'

function NearbyLocationSearch() {
  const map = useGoogleMap();

  React.useEffect(() => {
    if (map) {
      console.log("AAAA");
    }
  }, [map])

  return null
}

export default NearbyLocationSearch;
