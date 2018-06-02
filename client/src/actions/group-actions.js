import axios from "axios";
import * as types from "../types";

/* ------------   ACTION CREATORS     ------------------ */

export const setGroups = groups => ({
  type: types.SET_GROUPS,
  payload: groups
});

export const setGroup = group => ({
  type: types.SET_GROUP,
  payload: group
});

export const setGroupContacts = groupContacts => ({
  type: types.SET_GROUP_CONTACTS,
  payload: groupContacts
});

// ADMINISTRATIVE...

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  isFetching: bool
});

export const setError = error => ({
  type: types.SET_ERROR,
  error
});

export const clearError = () => ({
  type: types.CLEAR_ERROR
});

/* ------------       DISPATCHERS     ------------------ */

export const fetchGroups = () => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get("/api/groups/");

    dispatch(setGroups(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    dispatch(isFetching(false));
  }
};

export const fetchGroup = googleId => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get(`/api/groups/${googleId}`);

    dispatch(setGroup(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    dispatch(isFetching(false));
  }
};

export const fetchGroupContacts = googleId => async dispatch => {
  console.log("FECTHING GROUP CONTACTS", googleId);
  dispatch(isFetching(true));
  try {
    const res = await axios.get(`/api/groups/${googleId}/contacts`);
    console.log("GROUP CONTACTS", res.data);
    dispatch(setGroupContacts(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    dispatch(isFetching(false));
  }
};
