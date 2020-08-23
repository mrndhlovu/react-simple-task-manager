import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(
  createStore,
);

export default function configureStore(initialState = {}) {
  return createStoreWithMiddleware(() => {}, initialState);
}
