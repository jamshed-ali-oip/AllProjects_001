import { BankAcount, GET_WALLET } from '../Actions/type';

const initialState = 0
const bankDetail = {}

export default function wallet(state = initialState, action) {
  switch (action.type) {
    case GET_WALLET:
      return action.payload;
    case "addWallet":
      return Number(state) + Number(action.payload)
    case BankAcount:
      return {
        ...state,
        bankDetail: action.payload,
      };
    default:
      return state;
  }
}
