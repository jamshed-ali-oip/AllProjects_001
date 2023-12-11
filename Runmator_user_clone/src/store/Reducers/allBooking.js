import {GET_ALL_BOOKING} from '../Actions/actionType';

const INITIAL_STATE = []

export function allBooking(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_BOOKING:
      return action.payload
    default:
      return state;
  }
}
