import { Status } from "./../../interfaces/status";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LatLngExpression } from "leaflet";

interface GeolocalizerState extends Status {
  coords?: LatLngExpression;
}

const initialState: GeolocalizerState = {};

export const getGeolocation = createAsyncThunk("geolocalizer/getGeolocation", () => {
  const gl = new Promise((resolve, reject) => {
    if ("geolocation" in window.navigator) {
      const handleSuccess = (pos: any) => {
        const currpos: LatLngExpression = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        resolve(currpos);
      };
      const handleError = () => {
        reject();
      };

      window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      reject();
    }
  });

  return gl.then((position) => position);
});

export const geolocalizerSlice = createSlice({
  name: "geolocalizer",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<LatLngExpression>) => {
      state.coords = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getGeolocation.pending, (state) => {
      state.status = "LOADING";
    });
    builder.addCase(getGeolocation.fulfilled, (state, action) => {
      const payload: any = action.payload;
      const currpos = {
        lat: payload.lat,
        lng: payload.lng,
      };
      const pos: LatLngExpression = currpos;
      state.coords = pos;
      state.status = "SUCCESS";
    });
    builder.addCase(getGeolocation.rejected, (state) => {
      state.status = "FAILED";
    });
  },
});

export const { setPosition } = geolocalizerSlice.actions;

export const getPosition = (state: RootState) => state.geolocalizer.coords;

export default geolocalizerSlice.reducer;
