import {GET_CURRENT_BOOKING} from '../Actions/type';

const initialState = {}

export default function currentBooking(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_BOOKING:
      return action.payload;
    default:
      return state;
  }
}
