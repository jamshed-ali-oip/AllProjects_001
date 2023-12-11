import {GET_CURRENT_BOOKINGS} from '../Actions/actionType';

const INITIAL_STATE = {
  currentBookings: [],
};

export function BookingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CURRENT_BOOKINGS:
      return {
        ...state,
        currentBookings: action.payload,
      };
    default:
      return state;
  }
}
