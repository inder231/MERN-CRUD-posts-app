import * as types from "./actionTypes";
const initState = {
  loading: false,
  error: false,
  err:"",
  posts: [],
};
export const appReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.USER_GET_POSTS_REQUEST:return{
        ...state,loading: true
    }
    case types.USER_GET_POSTS_SUCCESS:return{
        ...state,loading: false,posts:payload
    }
    case types.USER_GET_POSTS_FAILURE:return{
        ...state,loading: false,error: true,err:payload
    }
    default:
      return state;
  }
};
