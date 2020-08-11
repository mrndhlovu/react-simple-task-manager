"use es6";

import { INITIALIZE_AUTH } from "../actions/ActionTypes";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_AUTH:
      return {
        user: action.user
      };
    default:
      return state;
  }
};

export default authReducer;
