// import {REGISTER} from '../const/const';
import * as types from '../const/const';
const InitialState = {

  accesToken: {},
  vehicle: {},
  ride: {},
  status: true,
  refesh: 0,
  userInfo: {},
  Conversation: {},
  Country: null
};

const authReducer = (state = InitialState, action) => {
  switch (action.type) {
    case types.REGISTER:
      console.log(action.payload);
      return {
        ...state,
        accesToken: action.payload,
      };
    case types.LOG_OUT:
      console.log(action.payload);
      return {
        ...state,
        accesToken: {},
      };
    case types.VEHICLE:
      console.log(action.payload);
      return {
        ...state,
        vehicle: action.payload,
      };
    case types.RIDE:
      console.log(action.payload);
      return {
        ...state,
        ride: action.payload,
      };
    case types.STATUS:
      console.log(action.payload);
      return {
        ...state,
        status: action.payload,
      };
    case types.REFRESH:
      console.log(action.payload);
      return {
        ...state,
        refesh: action.payload,
      };
    case types.USER:
      console.log(action.payload);
      return {
        ...state,
        userInfo: action.payload,
      };
    case types.COVERSATION:
      console.log(action.payload);
      return {
        ...state,
        Conversation: action.payload,
      };
    case types.COUNTRY_DETECT:
      console.log(action.payload);
      return {
        ...state,
        Country: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
