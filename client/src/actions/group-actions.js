import axios from "axios";
import * as types from "../types";
import { push } from "react-router-redux";
import { isFetching, setError, clearError } from "./common-actions";
import { fetchComponent, setQuery, setOffset } from "./query-actions";
import store from "../store";

/* ------------   ACTION CREATORS     ------------------ */

export const setGroups = groups => ({
  type: types.SET_GROUPS,
  payload: groups
});

export const clearGroups = () => ({
  type: types.CLEAR_GROUPS
});

export const setGroup = group => ({
  type: types.SET_GROUP,
  payload: group
});

export const fetchGroup = id => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get(`/api/groups/${id}`);
    dispatch(setGroup(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    dispatch(isFetching(false));
  }
};

// SEARCH GROUPS
export const searchGroups = values => {
  const state = store.getState();
  const groupId = state.groupReducer.group.id;
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("groups", [], setGroups, null, null));
};

// CREATE NEW GROUP
export const submitNewGroup = data => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/groups/new", data);
    dispatch(setGroup(res.data));
    dispatch(isFetching(false));
    dispatch(push(`/group/${res.data.id}`));
  } catch (err) {
    console.error("Submitting new group unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR SUBMITTING NEW GROUP"));
  }
};

// UPDATE GROUP
export const updateGroup = (values, id) => async dispatch => {
  try {
    console.log("VALUES", values);
    const res = await axios.patch(`/api/groups/${id}/update`, values);
    dispatch(setGroup(res.data));
  } catch (err) {
    console.error("Updating Group Unsuccessful", err);
  }
};

// DELETE GROUP
export const deleteGroup = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/groups/${id}/delete`);
    dispatch(setGroup(res.data));
    dispatch(push("/groups"));
  } catch (err) {
    console.error("Deleting Group Unsuccessful", err);
  }
};
