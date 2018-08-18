import axios from "axios";
import * as types from "../types";
import store from "../store";

import { searchGroups, setGroups } from "./group-actions";
import { fetchComponent, setQuery, setOffset, setCount } from "./query-actions";
import { setSelected } from "./modal-actions";
import { isFetching, clearFormData } from "./common-actions";

// Group Contacts

export const setContactGroups = contactGroups => ({
  type: types.SET_CONTACT_GROUPS,
  payload: contactGroups
});

export const searchContactGroups = values => {
  const state = store.getState();
  const contactId = state.contactReducer.contact.id;
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(
    fetchComponent("contacts", [], setContactGroups, contactId, "groups")
  );
};

export const setDiffedContactGroups = groups => dispatch => {
  const state = store.getState();
  const contactGroups = state.contactReducer.contactGroups;
  groups = groups.slice();

  contactGroups.forEach(contactGroup => {
    groups.forEach(group => {
      if (contactGroup.id == group.id) {
        group.disabled = true;
      }
    });
  });
  store.dispatch(setGroups(groups));
};

export const searchDiffedContactGroups = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("groups", [], setDiffedContactGroups));
};

export const submitContactGroups = (
  contactGroupsArray,
  contact
) => async dispatch => {
  const contactGroups = contactGroupsArray.map(group => ({
    contactId: contact.id,
    groupId: group.id
  }));
  dispatch(setSelected([]));
  dispatch(setQuery(""));
  try {
    const res = await axios.post(`/api/contacts/${contact.id}/groups/add`, {
      contactGroups
    });
    dispatch(setContactGroups(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Contact Groups Unsuccessful", err);
  }
};

export const deleteContactGroup = (group, contact) => async dispatch => {
  try {
    const res = await axios.post(`/api/contacts/${contact.id}/group/delete`, {
      groupId: group.id
    });
    dispatch(setContactGroups(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Contact Group Unsuccessful", err);
  }
};
