import { GET_DASHBOARD} from '../Actions/type';

const initialState = {}

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD:
      return action.payload;
      // case "addWallet":
      //   return {...state,total_wallet:Number(state.total_wallet)+Number(action.payload)}
    default:
      return state;
  }
}
