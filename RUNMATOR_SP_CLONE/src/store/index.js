import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import user from "./Reducers/user"
import services from "./Reducers/services";
import allServices from "./Reducers/allServices";
import dashboard from "./Reducers/dashboard";
import currentBooking from "./Reducers/currentBooking";
import wallet from "./Reducers/wallet";
import { allBooking } from "./Reducers/allBooking";
import { helpText } from "./Reducers/helpText";
const reducers = combineReducers({
    user,
    services,
    allServices,
    dashboard,
    currentBooking,
    wallet,
    allBooking,
    helpText
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));


export default store