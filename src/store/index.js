import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import groupReducer from './reducers/groupReducer';
import expenseReducer from './reducers/expenseReducer';
import { fetchCurrentUser } from './actions/userActions';

const reducers = combineReducers({
  userState: userReducer,
  groupState: groupReducer,
  expenseState: expenseReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(fetchCurrentUser);

export default store;
