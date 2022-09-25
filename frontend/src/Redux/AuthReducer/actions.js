import * as types from "./actionTypes";
import axios from "axios";
// Signup request
export const signup = (payload) => async (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_REQUEST });
  try {
        const res = await axios
            .post("https://backend-231.herokuapp.com/auth/signup", payload);
        return dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: res.data });
    } catch (err) {
        return dispatch({ type: types.USER_SIGNUP_FAILURE, payload: err });
    }
};
// Login request
export const login = (payload) => async (dispatch) => {
  dispatch({ type: types.USER_LOGIN_REQUEST });
  try {
        const res = await axios
            .post("https://backend-231.herokuapp.com/auth/login", payload);
        return dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
        return dispatch({ type: types.USER_LOGIN_FAILURE, payload: err.response.data });
    }
};
