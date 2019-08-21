import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import groupReducer from "./reducers/groupReducer";
import expenseReducer from "./reducers/expenseReducer";
import { userListener } from "./actions/userActions";

const reducers = combineReducers({
  userState: userReducer,
  groupState: groupReducer,
  expenseState: expenseReducer
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.dispatch(userListener);

export default store;
