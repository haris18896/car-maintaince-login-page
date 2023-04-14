import { types } from '../types/authTypes';
/**
 *
 * @param {*} state this is an initial state
 * @param {*} action action object contsins action type
 */

const defaultState = {
 token: '',
 user: null,
 loggedIn: false,
};
const authReducer = (state = defaultState, action) => {
 switch (action.type) {
  case '/auth/login/fulfilled':
   return {
    ...state,
    token: action?.payload?.accessToken,
   };
  case '/logout/fulfilled':
   return {
    ...state,
    token: null,
   };
  case '/profile/user/fulfilled':
   return {
    ...state,
    user: action?.payload,
   };
  case types.LOGOUT:
   return defaultState;
  default:
   return state;
 }
};

export default authReducer;
