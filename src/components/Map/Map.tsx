import { Box } from '@mui/material';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context';

export function Map() {
  const { center, getTo } = useApp();
  const [centerMark, setCenterMark] = useState({
    lat: 48.84996,
    lng: 2.32540,
  });

  useEffect(() => {
    setCenterMark({
      lat: center.lat,
      lng: center.lng,
    });
  }, [center]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDVIFFJ2HX8WcOGAdoEFsorswjOJ5caj2U',
  });

  // const onUnmount = React.useCallback((map) => {
  //   setMap(null);
  // }, []);

  // const onLoad = React.useCallback((map) => {
  //   const bounds = new window.google.maps.LatLngBounds({ lat: 0, lng: 0 });
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'red',
        position: 'relative',
        width: '100%',
        margin: '2em auto',
      }}
    >
      {isLoaded && (
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '400px',
        }}
        center={centerMark}
        zoom={15}
      >
        <Marker position={centerMark} />
      </GoogleMap>
      )}
    </Box>
  );
}
