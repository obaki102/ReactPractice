import { FETCH_POSTS, NEW_POST, FETCH_POST } from "../Actions/types";

const initialState = {
  records: [],
  record: {},
  customer: {}
};

//Evaluate what type to use
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, records: action.payload };

    case FETCH_POST:
      return { ...state, customer: action.payload };

    case NEW_POST:
      return { ...state, record: action.payload };

    default:
      return state;
  }
}
