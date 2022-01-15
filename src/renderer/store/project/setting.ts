import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SuiteInfo } from "renderer/suite";
import suiteBasic from "renderer/suite/basic";

export interface SuitePanel {
  expanded: boolean;
  info: SuiteInfo;
}

const initialState = {
  suitePanels: [
    {
      expanded: true,
      info: suiteBasic,
    }
  ] as SuitePanel[],
  showControls: false,
  showMiniMap: false,
};

type InitialState = typeof initialState;

export const getSuites = (state: InitialState) => state.suitePanels.map(({info}) => info);

export const getNodeTypes = (state: InitialState) => state.suitePanels.map(({info: {nodeTypes}}) => nodeTypes).reduce((a, b) => ({...a, ...b}));

export const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    togglePanelExpand: (state, action: PayloadAction<string>) => {
      const suiteName = action.payload;
      const idx = state.suitePanels.findIndex(({info: {name}}) => name === suiteName);
      if (idx !== -1) {
        const curSuitePanel = state.suitePanels[idx];
        state.suitePanels[idx] = {...curSuitePanel, expanded: !curSuitePanel.expanded};
      }
    },
    toggleControls: (state) => {
      state.showControls = !state.showControls;
    },
    toggleMiniMap: (state) => {
      state.showMiniMap = !state.showMiniMap;
    }
  }
});

export const {
  togglePanelExpand,
  toggleControls,
  toggleMiniMap,
} = slice.actions;
