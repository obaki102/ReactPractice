import { FETCH_POSTS, NEW_POST } from "../Actions/types";

const initialState = {
  items: [],
  item: {}
};

//Evaluate what type to use
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
}
