import axios from "axios";

import { searchContacts, setContacts } from "./contact-actions";
import * as types from "../types";
import { isFetching, isLoading } from "./group-actions";
import { clearFormData } from "./common-actions";
import store from "../store";

import { fetchComponent, setQuery, setOffset } from "./query-actions";

import { setModalVisibility, setSelected } from "./modal-actions";

export const setGroupContacts = groupContacts => ({
  type: types.SET_GROUP_CONTACTS,
  payload: groupContacts
});

export const clearGroupContacts = () => ({
  type: types.CLEAR_GROUP_CONTACTS
});

export const searchGroupContacts = values => {
  const state = store.getState();
  const groupId = state.groupReducer.group.id;
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(
    fetchComponent("groups", [], setGroupContacts, groupId, "contacts")
  );
};

// export const submitGroupContact = (
//   groupContactId,
//   groupId
// ) => async dispatch => {
//   const state = store.getState();
//   // dispatch(clearGroupContactsSearchResults());
//   // dispatch(clearFormData());
//   try {
//     const res = await axios.post(`/api/groups/${groupId}/group-contacts/add`, {
//       groupContactId,
//       groupId
//     });
//     dispatch(setGroupContacts(res.data));
//   } catch (err) {
//     console.error("Submitting Group Contact Unsuccessful", err);
//   }
// };

export const submitGroupContacts = (
  groupContactsArray,
  groupId
) => async dispatch => {
  const groupContacts = groupContactsArray.map(contact => ({
    groupId,
    contactId: contact.id
  }));
  dispatch(setSelected([]));
  dispatch(setModalVisibility(false));
  try {
    const res = await axios.post(
      `/api/groups/${groupId}/group-contacts/bulk-add`,
      {
        groupContacts,
        groupId
      }
    );
    dispatch(setGroupContacts(res.data));
  } catch (err) {
    console.error("Submitting Group Contacts Unsuccessful", err);
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
    dispatch(setGroupContacts(res.data));
  } catch (err) {
    console.error("Submitting Group Contact Unsuccessful", err);
  }
};
