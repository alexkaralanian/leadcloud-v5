import axios from "axios";
import * as types from "../types";
import store from "../store";

import { isFetching, clearFormData } from "./common-actions";
import { fetchComponent, setQuery, setOffset, setCount } from "./query-actions";
import { setSelected } from "./modal-actions";
import { searchContacts, setContacts } from "./contact-actions";

export const setGroupContacts = groupContacts => ({
  type: types.SET_GROUP_CONTACTS,
  payload: groupContacts
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

export const setDiffedGroupContacts = contacts => dispatch => {
  const state = store.getState();
  const groupContacts = state.groupReducer.groupContacts;
  const newContacts = contacts.slice();

  groupContacts.forEach(groupContact => {
    newContacts.forEach(contact => {
      if (groupContact.id == contact.id) {
        contact.disabled = true;
      }
    });
  });
  dispatch(setContacts(newContacts));
};

export const searchDiffedGroupContacts = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("contacts", [], setDiffedGroupContacts));
};

export const submitGroupContacts = (
  groupContactsArray,
  groupId
) => async dispatch => {
  const groupContacts = groupContactsArray.map(contact => ({
    groupId,
    contactId: contact.id
  }));
  dispatch(setSelected([]));
  dispatch(setQuery(""));
  try {
    const res = await axios.post(`/api/groups/${groupId}/contacts/add`, {
      groupContacts
    });
    dispatch(setGroupContacts(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Group Contacts Unsuccessful", err);
  }
};

export const deleteGroupContact = (contactId, groupId) => async dispatch => {
  const state = store.getState();
  try {
    const res = await axios.post(`/api/groups/${groupId}/contact/delete`, {
      contactId
    });
    dispatch(setGroupContacts(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Group Contact Unsuccessful", err);
  }
};
