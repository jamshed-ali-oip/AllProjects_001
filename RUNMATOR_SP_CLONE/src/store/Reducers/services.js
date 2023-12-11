import { GET_SERVICES} from '../Actions/type';

const initialState = []

export default function services(state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return action.payload;
    default:
      return state;
  }
}
