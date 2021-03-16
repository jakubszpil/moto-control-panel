const EARTH_RADIUS: number = 6371;

interface getDistanceProps {
  lat: number;
  lng: number;
}

function toRadian(degree: number) {
  return (degree * Math.PI) / 180;
}

export default function getDistance(origin: getDistanceProps, target: getDistanceProps): number {
  const lat1 = toRadian(origin.lat);
  const lon1 = toRadian(origin.lng);
  const lat2 = toRadian(target.lat);
  const lon2 = toRadian(target.lng);

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a: number =
    Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  const c: number = 2 * Math.asin(Math.sqrt(a));

  const distance: number = c * EARTH_RADIUS * 1000;

  return parseInt(distance.toFixed(10)) / 1000;
}
