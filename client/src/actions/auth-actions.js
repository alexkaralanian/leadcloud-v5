import axios from "axios";
import * as types from "../types";
import { isFetching } from "./common-actions";

export const authUser = user => ({
  type: types.AUTH_USER,
  payload: user
});

export const unauthUser = () => ({
  type: types.UNAUTH_USER
});

export const fetchUser = () => async dispatch => {
  try {
    dispatch(isFetching(true));
    const res = await axios.get("/api/auth/current-user");
    const user = res.data;
    dispatch(authUser(user));
  } catch (err) {
    dispatch(unauthUser());
  }
};

export const logout = () => async dispatch => {
  try {
    const res = await axios.get("/api/auth/logout");
    if (res.status === 200) dispatch(unauthUser());
  } catch (err) {
    console.error(err);
  }
};
