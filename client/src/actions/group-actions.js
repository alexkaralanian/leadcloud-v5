import axios from "axios";
import * as types from "../types";
import { push } from "react-router-redux";
// import { setCampaignGroupsSearchResults } from "./campaign-groups-actions";

/* ------------   ACTION CREATORS     ------------------ */

export const setGroups = (groups, limit, offset, query) => ({
  type: types.SET_GROUPS,
  groups,
  limit,
  offset,
  query
});

export const clearGroups = () => ({
  type: types.CLEAR_GROUPS
});

export const setGroup = group => ({
  type: types.SET_GROUP,
  payload: group
});

// ADMINISTRATIVE...

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  payload: bool
});

export const isLoading = bool => ({
  type: types.IS_LOADING,
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

// SEARCH GROUPS
// export const searchGroups = (
//   groupsArray,
//   limit,
//   offset,
//   query,
//   section
// ) => async dispatch => {
//   try {
//     const res = await axios.get(
//       `/api/groups/?limit=${limit}&offset=${offset}&query=${query}`
//     );
//     if (section === "campaignGroups") {
//       dispatch(setCampaignGroupsSearchResults(res.data));
//     } else {
//       dispatch(setGroups(res.data, limit, limit, null));
//     }
//   } catch (err) {
//     console.error("fetchContacts ERROR", err.response);
//     dispatch(setError("ERROR FETCHING CONTACTS"));
//   }
// };

// FETCH GROUPS
export const fetchGroups = (groups, limit, offset, query) => async dispatch => {
  dispatch(isLoading(true));
  // dispatch(isFetching(true));
  const newOffset = offset + limit;
  try {
    const res = await axios.get(
      `/api/groups/?limit=${limit}&offset=${offset}&query=${query}`
    );
    dispatch(setGroups(groups.concat(res.data), limit, newOffset, query));

    dispatch(isLoading(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    dispatch(isLoading(false));
  }
};

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

// CREATE NEW GROUP
export const submitNewGroup = data => async dispatch => {
  console.log("SUBMIT NEW GROUP", data);
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/groups/new", data);
    dispatch(setGroup(res.data));
    dispatch(push(`/group/${res.data.id}`));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Submitting new group unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR SUBMITTING NEW GROUP"));
  }
};

// UPDATE GROUP
export const updateGroup = (values, id) => async dispatch => {
  try {
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
