import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

const presistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth","user"],
};
const persistedReducer = persistReducer(presistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);
let persistor = persistStore(store);

export { persistor, store };


