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

export const clearGroupContacts = () => ({
  type: types.CLEAR_GROUP_CONTACTS,
  payload: clearGroupContacts
});

// ADMINISTRATIVE...

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  payload: bool
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
  console.log("FETCHING GROUPS");
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
  dispatch(isFetching(true));
  try {
    const res = await axios.get(`/api/groups/${googleId}/contacts`);
    dispatch(setGroupContacts(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    dispatch(isFetching(false));
  }
};
