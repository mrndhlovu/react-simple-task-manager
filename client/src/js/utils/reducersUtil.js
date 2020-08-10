import { updateObject } from "./updateObject";

export const hasError = state => {
  return updateObject(state, {
    hasError: true
  });
};

export const fetchingData = state => {
  return updateObject(state, {
    isLoading: true
  });
};

export const dataReceived = (state, action) => {
  return updateObject(state, {
    data: action.payload,
    dataReceived: true,
    isLoading: false,
    hasError: false
  });
};
