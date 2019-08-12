import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import groupReducer from "./reducers/groupReducer";

const reducers = combineReducers({
  userState: userReducer,
  groupState: groupReducer
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

// TODO:
// Delete documents and fix incrementer
// Add slug in url
// Delete group
// Leave group
