import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { GeolocalizerProps } from './Geolocalizer.types';
import { getGeolocation } from './geolocalizerSlice';

export default function Geolocalizer({ children }: GeolocalizerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGeolocation());
  }, [dispatch]);

  return <>{children}</>;
}
