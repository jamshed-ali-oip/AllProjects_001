import {GET_SERVICES} from '../Actions/actionType';

const INITIAL_STATE = {
  services: [],
};

export function ServicesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    default:
      return state;
  }
}
