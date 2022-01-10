import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { FlowElement } from 'react-flow-renderer';

type FlowElementExtend<T> = FlowElement<T> & {
  // parent?: FlowElementExtend<T>,
  children?: FlowElementExtend<T>[]
}

const eleTree: FlowElementExtend<any> = {id: 'root'} as FlowElementExtend<any>;
const initialState = {
  _idNext: 0,
  eleTree: eleTree,
  eleFocus: eleTree,
};

type InitialState = typeof initialState;

const newElement = (state: WritableDraft<InitialState>, element: FlowElementExtend<any>) => {
  if (state.eleFocus.children === undefined) {
    state.eleFocus.children = [element];
  } else {
    state.eleFocus.children.push(element);
  }
}

export const sliceGlobal = createSlice({
	name: 'global',
	initialState: initialState,
	reducers: {
    newNode: (state, action: PayloadAction<FlowElementExtend<any>>) => {
      newElement(state, {...action.payload, id: `node_${state._idNext++}`});
    },
    newEdge: (state, action: PayloadAction<FlowElementExtend<any>>) => {
      newElement(state, {...action.payload, id: `edge_${state._idNext++}`});
    },
		levelNext: (state, action: PayloadAction<FlowElementExtend<any>>) => {
			if (state.eleFocus === undefined) {
        state.eleFocus = state.eleTree;
      }
      state.eleFocus = action.payload;
		},
		levelPrev: (state) => {
      // if (state.eleFocus.parent !== undefined) {
      //   state.eleFocus = state.eleFocus.parent;
      // }
		}
	}
});

export const { newNode, newEdge, levelNext, levelPrev } = sliceGlobal.actions;

const store = configureStore({
	reducer: {
		global: sliceGlobal.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
