
import { saveLoginCredToLocalStorage } from "../../utils/localStorage";
import * as types from "./actionTypes";
const initState = {
  loading: false,
  error: false,
  err:"",
  token: "",
  auth: true,
};
export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.USER_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
      case types.USER_LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
        case types.USER_LOGIN_SUCCESS:
          saveLoginCredToLocalStorage("userId", payload.userId);
          saveLoginCredToLocalStorage("token", payload.token);
          return {
            ...state,
            loading: false,
            token: payload.token,
            auth: true,
          };
          case types.USER_LOGIN_FAILURE:
    
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
