"use es6";

import { INITIALIZE_AUTH } from "./ActionTypes";
import { userInfo } from "../apis/apiRequests";
import { createMessage, makeRequest } from "./index";

export const getAuth = () => {
  return dispatch => {
    dispatch(makeRequest(INITIALIZE_AUTH));
    userInfo().then(
      response => {
        dispatch(createMessage({ successMsg: "request successful" }));
      },
      error => {
        dispatch(createMessage({ errorMsg: "request fail" }));
      }
    );
  };
};
