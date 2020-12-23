import { combineReducers } from "redux";
import mediaReducer from "./media/media-reducer";
import canvasReducer from "./canvas/canvas-reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["canvas"],
};

const rootReducer = combineReducers({
  media: mediaReducer,
  canvas: canvasReducer,
});

export default persistReducer(persistConfig, rootReducer);
