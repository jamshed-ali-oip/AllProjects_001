import {GET_CARD} from '../Actions/actionType';

const INITIAL_STATE = {}

export function card(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CARD:
      return action.payload
    default:
      return state;
  }
}
