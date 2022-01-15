import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showControls: false,
  showMiniMap: false,
};
type InitialState = typeof initialState;

export const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    toggleControls: (state) => {
      state.showControls = !state.showControls;
    },
    toggleMiniMap: (state) => {
      state.showMiniMap = !state.showMiniMap;
    }
  }
});

export const {
  toggleControls,
  toggleMiniMap,
} = slice.actions;
