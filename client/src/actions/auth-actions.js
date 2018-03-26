import axios from "axios";
import * as types from "../types";

export const authUser = user => ({
  type: types.AUTH_USER,
  payload: user
});

export const unauthUser = () => ({
  type: types.UNAUTH_USER
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
    const res = await axios.get("/api/auth/logout");
    console.log("RES LOOUT", res.status);
    if (res.status === 200) dispatch(unauthUser());
  } catch (err) {
    console.error(err);
  }
};
