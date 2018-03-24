import axios from "axios";
import * as types from "../types";

export const authUser = user => ({
  type: types.AUTH_USER,
  user,
  isAuthed: true,
  isFetching: false
});

export const unauthUser = () => ({
  type: types.UNAUTH_USER,
  user: null,
  isAuthed: false
});

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  payload: bool
});
export const fetchUser = () => async dispatch => {
  try {
    dispatch(isFetching(true));
    const res = await axios.get("/api/auth/current-user");
    const user = res.data;
    if (user) {
      dispatch(authUser(user));
    }
  } catch (err) {
    console.error(err.response.statusText);
    dispatch(isFetching(false));
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.get("/api/auth/logout");
    dispatch(unauthUser());
  } catch (err) {
    console.error(err);
  }
};
