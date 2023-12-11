import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './Reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['UserReducer',],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

let persistor = persistStore(store);
export {store, persistor};
