import * as types from "./actionTypes";
import axios from "axios";
export const getPosts = (userId, token) => async (dispatch) => {
  dispatch({ type: types.USER_GET_POSTS_REQUEST });
  try {
    const res = await axios.get(
      `https://backend-231.herokuapp.com/profile/${userId}/feed`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return dispatch({ type: types.USER_GET_POSTS_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({
      type: types.USER_GET_POSTS_FAILURE,
      payload: error.response.data,
    });
  }
};

export const createPost = (userId, token, payload) => async (dispatch) => {
  dispatch({ type: types.USER_POST_REQUEST });
  try {
    const res = await axios.post(
      `https://backend-231.herokuapp.com/profile/${userId}/feed`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: types.USER_POST_SUCCESS, payload: res.data });
  } catch (err) {
    return dispatch({ type: types.USER_POST_FAILURE, payload: err });
  }
};
export const updatePost =
  (userId, postId, token, payload) => async (dispatch) => {
    dispatch({ type: types.USER_UPDATE_POSTS_REQUEST });
    try {
      const res = await axios.patch(
        `https://backend-231.herokuapp.com/profile/${userId}/feed/${postId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return dispatch({
        type: types.USER_UPDATE_POSTS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      return dispatch({ type: types.USER_UPDATE_POSTS_FAILURE, payload: err });
    }
  };
export const deletePost = (userId, postId, token) => async (dispatch) => {
  dispatch({ type: types.USER_DELETE_POSTS_REQUEST });
  try {
    const res = await axios.delete(
      `https://backend-231.herokuapp.com/profile/${userId}/feed/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return dispatch({ type: types.USER_DELETE_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    return dispatch({ type: types.USER_DELETE_POSTS_FAILURE, payload: err });
  }
};
