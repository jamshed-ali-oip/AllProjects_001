// import {REGISTER} from '../const/const';
import * as types from '../const/const';
const InitialState = {
  credential: {},
  accesToken: {},
  ride: {},
  userInfo: {},
  Coversation: {},
  calculatedfare: null,
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
    case types.LOGIN:
      console.log(action.payload);
      return {
        ...state,
        credential: action.payload,
      };

    case types.LOG_OUT:
      console.log(action.payload);
      return {
        ...state,
        accesToken: {},
      };
    case types.RIDE:
      console.log(action.payload);
      return {
        ...state,
        ride: action.payload,
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
        Coversation: action.payload,
      };
    case types.CALCULATED_FARE:
      console.log(action.payload);
      return {
        ...state,
        calculatedfare: action.payload,
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
