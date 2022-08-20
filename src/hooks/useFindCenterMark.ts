import { iMarker } from '../components/Map';

export const findCenterMark = (markers: iMarker[]) => {
  if (markers[0]?.position && markers[1]?.position) {
    const mark0 = markers[0].position;
    const mark1 = markers[1].position;

    if (mark0 && mark1) {
      const center = {
        lat: (mark0.lat + mark1.lat) / 2,
        lng: (mark0.lng + mark1.lng) / 2,
      };
      return center;
    }
  }

  return undefined;
};
