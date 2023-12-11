import {GET_HELP_TEXT} from '../Actions/actionType';

const INITIAL_STATE = {}

export function helpText(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_HELP_TEXT:
      return action.payload
    default:
      return state;
  }
}
