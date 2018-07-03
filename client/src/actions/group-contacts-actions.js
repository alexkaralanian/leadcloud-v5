import axios from "axios";

import { searchContacts } from "./contact-actions";
import * as types from "../types";
import { isFetching, isLoading } from "./group-actions";
import store from "../store";

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
  type: types.CLEAR_GROUP_CONTACTS
});

export const clearGroupContactsSearchResults = () => ({
  type: types.CLEAR_GROUP_CONTACTS_SEARCH_RESULTS
});

export const clearForm = () => ({
  type: types.FORM_SUBMIT_SUCCESS
});

export const setGroupContactsSearchResults = groupContacts => ({
  type: types.SET_GROUP_CONTACTS_SEARCH_RESULTS,
  payload: groupContacts
});

export const fetchGroupContacts = (
  id,
  groupContacts,
  groupContactsLimit,
  groupContactsOffset,
  groupContactsQuery
) => async dispatch => {
  dispatch(isLoading(true));
  const newOffset = groupContactsOffset + groupContactsLimit;
  try {
    const res = await axios.get(
      `/api/groups/${id}/contacts/?limit=${groupContactsLimit}&offset=${groupContactsOffset}&query=${groupContactsQuery}`
    );
    dispatch(
      setGroupContacts(
        groupContacts.concat(res.data),
        groupContactsLimit,
        newOffset,
        groupContactsQuery
      )
    );

    dispatch(isLoading(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    dispatch(isFetching(false));
  }
};

export const searchGroupContacts = values => {
  const state = store.getState();
  const query = values.nativeEvent.target.defaultValue;
  const groupContactsSearchResults =
    state.groupReducer.groupContactsSearchResults;

  if (query.length < 1) store.dispatch(clearGroupContactsSearchResults());
  if (query.length >= 1) {
    store.dispatch(
      searchContacts(groupContactsSearchResults, 25, 0, query, "groupContacts")
    );
  }

  if (!query) store.dispatch(clearGroupContactsSearchResults());
};

export const submitGroupContact = (
  groupContactId,
  groupId
) => async dispatch => {
  const state = store.getState();
  dispatch(clearGroupContactsSearchResults());
  dispatch(clearForm());
  try {
    const res = await axios.post(`/api/groups/${groupId}/group-contacts/add`, {
      groupContactId,
      groupId
    });

    dispatch(
      setGroupContacts(
        res.data,
        state.groupReducer.groupContactsLimit,
        state.groupReducer.groupContactsLimit,
        null
      )
    );
  } catch (err) {
    console.error("Submitting Group Contact Unsuccessful", err);
  }
};

export const deleteGroupContact = (
  groupContactId,
  groupId
) => async dispatch => {
  const state = store.getState();
  try {
    const res = await axios.post(
      `/api/groups/${groupId}/group-contacts/delete`,
      {
        groupContactId,
        groupId
      }
    );

    dispatch(
      setGroupContacts(
        res.data,
        state.groupReducer.groupContactsLimit,
        state.groupReducer.groupContactsLimit,
        null
      )
    );
  } catch (err) {
    console.error("Submitting Group Contact Unsuccessful", err);
  }
};
