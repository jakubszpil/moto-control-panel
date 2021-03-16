import { Status } from "./../../interfaces/status";
import { createAsyncThunk, createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

export interface Device {
  Id: number;
  Name: string;
  Type: string;
  SerialNumber: string;
  Strength: number;
  BatteryLevel: number;
  WorkingMode: string;
  Position: {
    Lat: string;
    Lon: string;
  };
}

interface DevmanagerState extends Status {
  devices: Device[];
  device: Device | null;
}

const initialState: DevmanagerState = {
  devices: [],
  device: null,
};

export const collectDevices = createAsyncThunk("devmanager/collectDevices", () => {
  const API =
    process.env.NODE_ENV === "development"
      ? "/radios"
      : `${window.location.protocol}//${window.location.hostname}:8080/radios`;

  return fetch(API).then((data) => data.json());
});

export const devmanagerSlice = createSlice({
  name: "devmanager",
  initialState,
  reducers: {
    saveDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
    },
    selectDevice: (state, action: PayloadAction<Pick<Device, "Id" | "Name" | "SerialNumber">>) => {
      if (state.devices.length > 0) {
        let selected: any;
        if (action.payload.Id !== undefined) selected = state.devices.find((device) => device.Id === action.payload.Id);
        else if (action.payload.SerialNumber !== undefined)
          selected = state.devices.find((device) => device.SerialNumber === action.payload.SerialNumber);
        else if (action.payload.Name !== undefined)
          selected = state.devices.find((device) => device.Name === action.payload.Name);

        state.device = selected;
      }
    },
    unselectDevice: (state) => {
      state.device = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(collectDevices.pending, (state) => {
      state.status = "LOADING";
    });
    builder.addCase(collectDevices.fulfilled, (state, action: PayloadAction<Device[]>) => {
      state.status = "SUCCESS";
      state.devices = action.payload;
    });
    builder.addCase(collectDevices.rejected, (state) => {
      state.status = "FAILED";
    });
  },
});

export const { saveDevices, selectDevice, unselectDevice } = devmanagerSlice.actions;

export default devmanagerSlice.reducer;
