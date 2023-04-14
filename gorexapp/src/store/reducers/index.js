import {combineReducers} from 'redux';
import AuthReducer from './authReducers';

// import reducers from modules and combine here
export default combineReducers({
  auth: AuthReducer,
});
