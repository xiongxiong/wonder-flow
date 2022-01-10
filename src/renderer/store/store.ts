import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { FlowElement } from 'react-flow-renderer';

type FlowElementExtend<T> = FlowElement<T> & {
  children?: FlowElementExtend<T>[]
}

const initialState = {
  elements: [] as FlowElementExtend<any>[],
  nodePath: [] as string[],
};
type InitialState = typeof initialState;

export const curParentNode = (state: InitialState) => {
  let tempPath = [...state.nodePath];
  let tempElements = state.elements as (FlowElementExtend<any>[] | undefined);
  let tempNode = undefined;
  let tempNodeId = tempPath.shift();
  while (tempNodeId !== undefined) {
    tempNode = tempElements?.find(ele => ele.id === tempNodeId);
    tempNodeId = tempPath.shift();
    tempElements = tempNode?.children;
  }
  return tempNode;
}

export const curElements = (state: InitialState) => {
  let tempNode = curParentNode(state);
  if (tempNode === undefined) {
    return state.elements;
  } else {
    return tempNode.children || [];
  }
}

export const sliceGlobal = createSlice({
	name: 'global',
	initialState: initialState,
	reducers: {
    updateElements: (state, action: PayloadAction<FlowElementExtend<any>[]>) => {
        let tempNode = curParentNode(state);
        if (tempNode === undefined) {
          state.elements = action.payload;
        } else {
          tempNode.children = action.payload;
        }
      },
		levelNext: (state, action: PayloadAction<FlowElementExtend<any>>) => {
			state.nodePath.push(action.payload.id);
		},
		levelPrev: (state) => {
            state.nodePath.pop();
		}
	}
});

export const { updateElements, levelNext, levelPrev } = sliceGlobal.actions;

const store = configureStore({
	reducer: {
		global: sliceGlobal.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
