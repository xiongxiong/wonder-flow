import {
    applyMiddleware,
    combineReducers,
    createStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { slice as sliceProjectData } from "./project/data";
import { slice as sliceProjectSetting } from "./project/setting";
import { slice as sliceSystemSetting } from "./system/setting";

const projectReducers = combineReducers({
    data: sliceProjectData.reducer,
    setting: sliceProjectSetting.reducer,
});

const systemReducers = combineReducers({
  setting: sliceSystemSetting.reducer,
});

const reducers = combineReducers({
    project: projectReducers,
    system: systemReducers,
});

const store = createStore(reducers, applyMiddleware(logger));

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
