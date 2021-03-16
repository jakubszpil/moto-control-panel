import { configureStore } from '@reduxjs/toolkit';
import geolocalizerReducer from '../features/geolocalizer/geolocalizerSlice';
import devmanagerReducer from '../features/devmanager/devmanagerSlice';
import menuReducer from '../features/menu/menuSlice';

const store = configureStore({
  reducer: {
    geolocalizer: geolocalizerReducer,
    devmanager: devmanagerReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
