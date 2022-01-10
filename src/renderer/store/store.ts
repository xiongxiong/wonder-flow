import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Position {
	x: number;
	y: number;
}

interface FlowElement {
	id: string;
	type: string;
	data: any;
}

interface FlowNode extends FlowElement {
	position: Position;
}

interface FlowNodeEmbeddable extends FlowNode {
	children: FlowNode[];
}

interface FlowEdge extends FlowElement {
	source: string;
	target: string;
	label: string;
}

const theMap = new Map();

const theTree = new Map();

export const sliceGlobal = createSlice({
	name: 'global',
	initialState: {
		idNext: 0,
		eleMap: theMap,
		eleTree: theTree,
		eleTreeFocus: theTree,
		nodePath: [] as string[]
	},
	reducers: {
		newElement: (state, action: PayloadAction<FlowElement>) => {
			state.idNext++;
      state.eleTreeFocus.set(action.payload.id, new Map());
      state.eleMap.set(action.payload.id, action.payload);
		},
		levelNext: (state, action: PayloadAction<FlowNodeEmbeddable>) => {
			state.eleTreeFocus = state.eleTreeFocus.get(action.payload.id);
			state.nodePath.push(action.payload.id);
		},
		levelPrev: (state) => {
			state.nodePath.pop();

			let tempPath = [ ...state.nodePath ];
			let tempTree = state.eleTree;
			let curPos = tempPath.shift();
			while (curPos !== undefined) {
				tempTree = tempTree.get(curPos);
				curPos = tempPath.shift();
			}
      state.eleTreeFocus = tempTree;
		}
	}
});

export const { newElement, levelNext, levelPrev } = sliceGlobal.actions;

const store = configureStore({
	reducer: {
		global: sliceGlobal.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
