import axios from "axios";
import * as types from "../types";
import store from "../store";

import { isFetching, clearFormData } from "./common-actions";
import { fetchComponent, setQuery, setOffset, setCount } from "./query-actions";
import { setSelected } from "./modal-actions";
import { searchContacts, setContacts } from "./contact-actions";

export const setListingContacts = listingContacts => ({
  type: types.SET_LISTING_CONTACTS,
  payload: listingContacts
});

export const searchListingContacts = values => {
  console.log("VALUES", values);
  const state = store.getState();
  const listingId = state.listingReducer.listing.id;
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(
    fetchComponent("listings", [], setListingContacts, listingId, "contacts")
  );
};

export const setDiffedListingContacts = contacts => dispatch => {
  const state = store.getState();
  const listingContacts = state.listingContactsReducer.listingContacts;
  const newContacts = contacts.slice();

  listingContacts.forEach(listingContact => {
    newContacts.forEach(contact => {
      if (listingContact.id == contact.id) {
        contact.disabled = true;
      }
    });
  });
  dispatch(setContacts(newContacts));
};

export const searchDiffedListingContacts = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("contacts", [], setDiffedListingContacts));
};

export const submitListingContacts = (
  listingContactsArray,
  listingId
) => async dispatch => {
  const listingContacts = listingContactsArray.map(contact => ({
    listingId,
    contactId: contact.id
  }));
  dispatch(setSelected([]));
  dispatch(setQuery(""));
  try {
    const res = await axios.post(`/api/listings/${listingId}/contacts/add`, {
      listingContacts
    });
    dispatch(setListingContacts(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Listing Contacts Unsuccessful", err);
  }
};

export const deleteListingContact = (
  contactId,
  listingId
) => async dispatch => {
  try {
    const res = await axios.post(`/api/listings/${listingId}/contact/delete`, {
      contactId
    });
    dispatch(setListingContacts(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Deleting listing contact unsuccessful", err);
  }
};
