import { FETCH_POSTS, NEW_POST, FETCH_POST, PUT_CUST } from "../Actions/types";

const initialState = {
  records: [],
  record: {},
  customer: {},
  response: {},
  loading: true
};

//Evaluate what type to use
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      console.log(action.payload);
      return { ...state, records: action.payload, loading: true };

    case FETCH_POST:
      return { ...state, customer: action.payload };

    case NEW_POST:
      return { ...state, record: action.payload };

    case PUT_CUST:
      return { ...state, records: action.payload };

    default:
      return state;
  }
}
