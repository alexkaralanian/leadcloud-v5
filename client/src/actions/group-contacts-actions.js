import axios from "axios";

import { searchContacts } from "./contact-actions";
import * as types from "../types";
import { isFetching, isLoading } from "./group-actions";
import { clearFormData } from "./common-actions";
import store from "../store";

import { fetchComponent, setQuery } from "./query-actions";

export const setGroupContacts = groupContacts => ({
  type: types.SET_GROUP_CONTACTS,
  payload: groupContacts
});

export const clearGroupContacts = () => ({
  type: types.CLEAR_GROUP_CONTACTS
});

// export const clearGroupContactsSearchResults = () => ({
//   type: types.CLEAR_GROUP_CONTACTS_SEARCH_RESULTS
// });

// export const setGroupContactsSearchResults = groupContacts => ({
//   type: types.SET_GROUP_CONTACTS_SEARCH_RESULTS,
//   payload: groupContacts
// });

export const searchGroupContacts = values => {
  const state = store.getState();
  const groupId = state.groupReducer.group.id;
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(
    fetchComponent("groups", [], setGroupContacts, groupId, "contacts")
  );
};

export const submitGroupContact = (
  groupContactId,
  groupId
) => async dispatch => {
  const state = store.getState();
  // dispatch(clearGroupContactsSearchResults());
  dispatch(clearFormData());
  try {
    const res = await axios.post(`/api/groups/${groupId}/group-contacts/add`, {
      groupContactId,
      groupId
    });

    dispatch(
      setGroupContacts(
        res.data
        // state.groupReducer.groupContactsLimit,
        // state.groupReducer.groupContactsLimit,
        // null
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
