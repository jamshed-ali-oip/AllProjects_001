import {GET_CURRENT_BOOKING} from '../Actions/actionType';

const INITIAL_STATE = []

export function currentBooking(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CURRENT_BOOKING:
      return action.payload
    default:
      return state;
  }
}
