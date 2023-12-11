import {GET_ALL_SERVICES} from '../Actions/type';

const initialState = []

export default function allServices(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SERVICES:
      return action.payload;
    default:
      return state;
  }
}
