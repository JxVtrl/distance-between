import React, { useEffect, useState } from 'react';
import { useApp } from '../../context';
import { getDistanceFromLatLonInNMiles } from '../../hooks';

export function Nautical() {
  const [distance, setDistance] = useState(0);
  const { ap1, ap2 } = useApp();

  useEffect(() => {
    if (ap1 && ap2) {
      setDistance(
        getDistanceFromLatLonInNMiles(
          ap1.location.lat,
          ap1.location.lon,
          ap2.location.lat,
          ap2.location.lon,
        ),
      );
    }
  }, [ap1, ap2]);

  return (
    <>
      {distance}
      {' '}
      NM
    </>
  );
}
