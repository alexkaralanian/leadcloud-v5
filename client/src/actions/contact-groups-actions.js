import axios from "axios";
import * as types from "../types";
import store from "../store";

import { fetchComponent, setQuery, setOffset, setCount } from "./query-actions";

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
  store.dispatch(fetchComponent("contacts", [], setContactGroups, contactId, "groups"));
};

export const submitContactGroups = (contactGroupsArray, contact) => async dispatch => {
  const contactGroups = contactGroupsArray.map(group => ({
    contactId: contact.id,
    groupId: group.id
  }));
  dispatch(setQuery(""));
  try {
    const res = await axios.post(`/api/contacts/${contact.id}/groups`, {
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
    const res = await axios.delete(`/api/contacts/${contact.id}/group?groupId=${group.id}`);
    dispatch(setContactGroups(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Contact Group Unsuccessful", err);
  }
};
