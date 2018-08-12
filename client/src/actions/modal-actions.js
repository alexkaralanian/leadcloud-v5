import axios from "axios";
import store from "../store";
import * as types from "../types";

export const setModalVisibility = bool => ({
  type: types.SET_MODAL_VISIBILITY,
  payload: bool
});

export const setSelectedContacts = contacts => ({
  type: types.SET_SELECTED_CONTACTS,
  payload: contacts
});

export const addSelectedContact = contact => {
  const state = store.getState();
  console.log("STATE", state);
  const selectedContacts = state.modalReducer.selectedContacts.slice();
  if (!selectedContacts.includes(contact)) selectedContacts.push(contact);
  store.dispatch(setSelectedContacts(selectedContacts));
};

export const deleteSelectedContact = contact => {
  const state = store.getState();
  console.log("DELETE STATE", state);
  const selectedContacts = state.modalReducer.selectedContacts.slice();
  selectedContacts.splice(selectedContacts.indexOf(contact));
  store.dispatch(setSelectedContacts(selectedContacts));
};

