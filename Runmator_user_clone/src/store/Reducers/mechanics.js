import {GET_MECHANICS} from '../Actions/actionType';

const INITIAL_STATE = []

export function mechanics(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MECHANICS:
      if(action.payload?.length){
        return action.payload
      }
      return []
    default:
      return state;
  }
}
