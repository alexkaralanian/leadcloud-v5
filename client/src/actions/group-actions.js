import axios from "axios";
import { push } from "react-router-redux";

import * as types from "../types";
import store from "../store";
import { isFetching, setError } from "./common-actions";
import { fetchComponent, setQuery, setOffset } from "./query-actions";

export const setGroups = groups => ({
  type: types.SET_GROUPS,
  payload: groups
});

export const setGroup = group => ({
  type: types.SET_GROUP,
  payload: group
});

// FETCH GROUP
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
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("groups", [], setGroups, null, null));
};

// CREATE GROUP
export const submitNewGroup = data => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/groups", data);
    dispatch(setGroup(res.data));
    dispatch(isFetching(false));
    dispatch(push(`/groups/${res.data.id}`));
  } catch (err) {
    console.error("Submitting new group unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR SUBMITTING NEW GROUP"));
  }
};

// UPDATE GROUP
export const updateGroup = (values, id) => async dispatch => {
  try {
    const res = await axios.patch(`/api/groups/${id}`, values);
    dispatch(setGroup(res.data));
  } catch (err) {
    console.error("Updating Group Unsuccessful", err);
  }
};

// DELETE GROUP
export const deleteGroup = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/groups/${id}`);
    dispatch(setGroup(res.data));
    dispatch(push("/groups"));
  } catch (err) {
    console.error("Deleting Group Unsuccessful", err);
  }
};
