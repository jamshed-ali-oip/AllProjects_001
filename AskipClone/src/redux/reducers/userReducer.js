import {
  SET_PAGE_TWO,
  SET_PAGE_FIVE,
  SET_PAGE_FOUR,
  SET_PAGE_THREE,
  GET_KIFFS_DATA,
  RELEVENT,
  DATA_EMPTY,
  GET_EVENTS
} from '../const/const';
import { baseURL } from '../../config';

const InitialState = {
  data: [],
  getKiffsData: [],
  relevant: [],
  getEvents: [],

};

const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    // case SET_PAGE_TWO:
    //   // console.log(action.payload);
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    // case SET_PAGE_THREE:
    //   // console.log(action.payload);
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    // case SET_PAGE_FOUR:
    //   // console.log(action.payload);
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    // case SET_PAGE_FIVE:
    //   // console.log(action.payload);
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    case GET_KIFFS_DATA:
      // console.log(action.payload);
      return {
        ...state,
        getKiffsData: action?.payload,
      };
    case DATA_EMPTY:

      return {
        ...state,
        data: []
      };
    case GET_EVENTS:
      // console.log("event details",action?.payload)
      return {
        ...state,
        getEvents:action?.payload
      };
    default:
      return state;


  }

};

export default userReducer;
