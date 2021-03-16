import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { DevmanagerProps } from './Devmanager.types';
import { collectDevices } from './devmanagerSlice';

export default function Devmanager({ children }: DevmanagerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(collectDevices());
  }, [dispatch]);

  useEffect(() => {
    const f = () => dispatch(collectDevices());

    const interval = setInterval(f, 5000);

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}
