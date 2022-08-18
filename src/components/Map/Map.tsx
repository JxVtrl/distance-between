import { Box, Skeleton } from '@mui/material';
import {
  useJsApiLoader, GoogleMap, Marker, DirectionsRenderer,
} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { Form } from '../Form';
import { useApp } from '../../context';
import { findCenterMark } from '../../hooks';

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
    ap1, ap2,
  } = useApp();
  const [errorMsg, setErrorMsg] = useState('');
  const [markers, setMarkers] = useState<iMarker[]>([]);
  const [directionResponse, setDirectionResponse] = useState({});
  const [centerMark, setCenterMark] = useState<iCenterMark | undefined>({
    lat: 0,
    lng: 0,
  });

  async function calculateRoute(list: iMarker[]) {
    const directionService = new window.google.maps.DirectionsService();
    try {
      const results = await directionService.route(
        {
          origin: list[0].position,
          destination: list[1].position,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
      );
      setDirectionResponse(results);
      setErrorMsg('');
    } catch {
      setErrorMsg('Error calculating route');
    }
  }

  useEffect(() => {
    if (ap1 && ap2) {
      setMarkers([
        {
          id: 0,
          name: ap1.name,
          position: {
            lat: ap1.location.lat,
            lng: ap1.location.lon,
          },
        },
        {
          id: 1,
          name: ap2.name,
          position: {
            lat: ap2.location.lat,
            lng: ap2.location.lon,
          },
        },
      ]);
    }
  }, [ap1, ap2]);

  useEffect(() => {
    setCenterMark(
      findCenterMark(markers),
    );
    calculateRoute(markers);
  }, [markers]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDVIFFJ2HX8WcOGAdoEFsorswjOJ5caj2U',
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <Skeleton width="100%" height="100vh" />;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Form errorMsg={errorMsg} />
      {isLoaded && (
      <GoogleMap
        mapContainerStyle={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
        }}
        center={centerMark}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          zoomControl: false,
        }}
        zoom={10}
      >
          {markers.map((item) => (
            <Marker
              key={item.id}
              position={item.position}
              options={{
                label: item.name,
              }}
            />
          ))}
          {directionResponse
            && (
            <DirectionsRenderer
              directions={directionResponse}
            />
            )}
      </GoogleMap>
      )}
    </Box>
  );
}
