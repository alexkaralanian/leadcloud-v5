import axios from "axios";
import * as types from "../types";

export const authUser = user => ({
  type: types.AUTH_USER,
  user,
  isAuthed: true
});

export const unauthUser = () => ({
  type: types.UNAUTH_USER,
  user: null,
  isAuthed: false
});

export const fetchUser = () => async dispatch => {
  console.log('fecth user called')
  try {
    const res = await axios.get("/api/authp/current-user");
    const user = res.data;
    console.log('USER', user)
    if (user) {
      dispatch(authUser(user))
      console.log('USER', user)
    };
  } catch (err) {
    console.error(err.response.statusText);
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
