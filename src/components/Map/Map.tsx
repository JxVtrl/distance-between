import { Box } from '@mui/material';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context';
import { findCenterMark } from '../../hooks'

export interface iMarker {
  id: number
  name: string
  position: {
    lat: number
    lng: number
  }
}

interface iCenterMark {
  lat: number
  lng: number
}

export function Map() {
  const {
    center, ap1, ap2,
  } = useApp();
  const [markers, setMarkers] = useState<iMarker[]>([]);
  const [centerMark, setCenterMark] = useState<iCenterMark | undefined>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    setMarkers([
      {
        id: ap1.id,
        name: ap1.name,
        position: {
          lat: ap1.location.lat,
          lng: ap1.location.lon,
        },
      },
      {
        id: ap2.id,
        name: ap2.name,
        position: {
          lat: ap2.location.lat,
          lng: ap2.location.lon,
        },
      },
    ]);
  }, [ap1, ap2]);

  useEffect(() => {
    setCenterMark(
      findCenterMark(markers),
    );
  }, [markers]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDVIFFJ2HX8WcOGAdoEFsorswjOJ5caj2U',
  });

  return (
    <Box
      sx={{
        backgroundColor: 'red',
        position: 'relative',
        width: '100%',
        margin: '2em auto',
      }}
    >
      {isLoaded && centerMark?.lat !== 0 && centerMark?.lng !== 0 && (
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '400px',
        }}
        center={centerMark}
        zoom={15}
      >
          {markers.map((item) => (
            <Marker
              position={item.position}
              options={{
                label: item.name,
              }}
            />
          ))}
      </GoogleMap>
      )}
    </Box>
  );
}
