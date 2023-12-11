import {combineReducers, compose, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  userLogin,
  userSignup,
  userFavourite,
  userInterest,
  userAuthSignUp,
} from './Reducers/AuthReducers';
import {
  userReducer,
  postsReducer,
  usersNearmeReducer,
  userCoordsReducer,
  notificationsReducer,
  connectionsReducer,
  messagesReducer,
} from './Reducers/InAppReducer';

const reducers = combineReducers({
  userLogin,
  userSignup,
  userFavourite,
  userInterest,
  userAuthSignUp,
  userReducer,
  usersNearmeReducer,
  userCoordsReducer,
  postsReducer,
  notificationsReducer,
  connectionsReducer,
  messagesReducer,
});

const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState),
);

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  whitelist: ['userReducer', 'userCoordsReducer'],
  timeout: null,
  transforms: [transformCircular],
};

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
let persistor = persistStore(store);

export {store, persistor};
