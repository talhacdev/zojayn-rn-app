import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  PROFILE_INFO,
} from '../actions/types';
const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
        token: action.token,
      };
    case LOGOUT_USER:
      return {
        ...state,
        token: '',
        isLoggedIn: false,
        user: null,
      };
    case PROFILE_INFO:
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
        token: action.token,
      };
    default:
      return state;
  }
};
