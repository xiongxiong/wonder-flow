import {
    applyMiddleware,
    combineReducers,
    createStore,
    PayloadAction,
} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { FlowElement, removeElements } from "react-flow-renderer";
import logger from "redux-logger";

type FlowElementExtend<T> = FlowElement<T> & {
    children?: FlowElementExtend<T>[];
};

interface NodeBasic {
    id: string;
    label: string;
}

const initialState = {
    elements: [] as FlowElementExtend<any>[],
    selection: [] as FlowElementExtend<any>[],
    nodePath: [{ id: "home", label: "Top" }] as NodeBasic[],
};
type InitialState = typeof initialState;

export const curParentNode = (state: InitialState) => {
    let tempPath = [...state.nodePath.slice(1)];
    let tempElements = state.elements as FlowElementExtend<any>[] | undefined;
    let tempNode = undefined;
    let tempNodeBasic = tempPath.shift();
    while (tempNodeBasic !== undefined) {
        tempNode = tempElements?.find((ele) => ele.id === tempNodeBasic?.id);
        tempNodeBasic = tempPath.shift();
        tempElements = tempNode?.children;
    }
    return tempNode;
};

export const curElements = (state: InitialState) => {
    let tempNode = curParentNode(state);
    if (tempNode === undefined) {
        return state.elements;
    } else {
        return tempNode.children || [];
    }
};

export const hasSelection = (state: InitialState) => state.selection.length > 0;

export const sliceGlobal = createSlice({
    name: "global",
    initialState: initialState,
    reducers: {
        updateElements: (
            state,
            action: PayloadAction<FlowElementExtend<any>[]>
        ) => {
            let tempNode = curParentNode(state);
            if (tempNode === undefined) {
                state.elements = action.payload;
            } else {
                tempNode.children = action.payload;
            }
        },
        updateSelection: (
            state,
            action: PayloadAction<FlowElementExtend<any>[]>
        ) => {
            state.selection = action.payload;
        },
        removeSelection: (state) => {
            state.elements = removeElements(
                state.selection,
                state.elements
            );
        },
        levelNext: (state, action: PayloadAction<FlowElementExtend<any>>) => {
            state.nodePath.push({
                id: action.payload.id,
                label: action.payload.data.label,
            });
            state.selection = [];
        },
        levelPrev: (state) => {
            state.nodePath.pop();
            state.selection = [];
        },
        levelSpec: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            let tempPath = [];
            for (const nb of state.nodePath) {
                tempPath.push(nb);
                if (nb.id === id) {
                    break;
                }
            }
            state.nodePath = tempPath;
            state.selection = [];
        },
    },
});

export const {
    updateElements,
    updateSelection,
    removeSelection,
    levelNext,
    levelPrev,
    levelSpec,
} = sliceGlobal.actions;

const reducers = combineReducers({
    global: sliceGlobal.reducer,
});

const store = createStore(reducers, applyMiddleware(logger));

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
