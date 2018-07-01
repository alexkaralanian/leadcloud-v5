import axios from "axios";
import * as types from "../types";
import { isFetching, isLoading } from "./group-actions";

// Group Contacts
export const setGroupContacts = (
  groupContacts,
  groupContactsLimit,
  groupContactsOffset,
  groupContactsQuery
) => ({
  type: types.SET_GROUP_CONTACTS,
  groupContacts,
  groupContactsLimit,
  groupContactsOffset,
  groupContactsQuery
});

export const clearGroupContacts = () => ({
  type: types.CLEAR_GROUP_CONTACTS,
  payload: clearGroupContacts
});

export const fetchGroupContacts = (
  id,
  groupContacts,
  groupContactsLimit,
  groupContactsOffset,
  groupContactsQuery
) => async dispatch => {
  dispatch(isLoading(true));
  // dispatch(isFetching(true));
  const newOffset = groupContactsOffset + groupContactsLimit;
  try {
    const res = await axios.get(
      `/api/groups/${id}/contacts/?limit=${groupContactsLimit}&offset=${groupContactsOffset}&query=${groupContactsQuery}`
    );
    // dispatch(setGroupContacts(res.data));
    dispatch(
      setGroupContacts(
        groupContacts.concat(res.data),
        groupContactsLimit,
        newOffset,
        groupContactsQuery
      )
    );

    dispatch(isLoading(false));
    // dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    dispatch(isFetching(false));
  }
};
