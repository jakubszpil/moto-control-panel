import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  opened: boolean;
  isExpanding: boolean;
}

const initialState: MenuState = {
  opened: false,
  isExpanding: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    expand: state => {
      state.opened = true;
    },
    toggle: state => {
      state.opened = !state.opened;
    },
    close: state => {
      state.opened = false;
    },
  },
});

export const { expand, toggle, close } = menuSlice.actions;

export default menuSlice.reducer;
