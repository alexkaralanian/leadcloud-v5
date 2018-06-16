import axios from "axios";
import * as types from "../types";
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

// Group Contacts
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
export const fetchGroups = (
  groupsArray,
  limit,
  offset,
  query
) => async dispatch => {
  dispatch(isFetching(true));
  const newOffset = offset + limit;
  try {
    const res = await axios.get(
      `/api/groups/?limit=${limit}&offset=${offset}&query=${query}`
    );
    dispatch(setGroups(groupsArray.concat(res.data), limit, newOffset, query));

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
