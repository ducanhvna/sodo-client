import promise from "redux-promise-middleware";
import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";

const store = createStore(rootReducer, compose(applyMiddleware(promise)));
export default store;
