import axios from "axios";

import { searchContacts } from "./contact-actions";
import { isFetching } from "./listing-actions";
import { clearFormData } from "./common-actions";
import { fetchComponent, setQuery, setOffset } from "./query-actions";
import { setModalVisibility, setSelectedContacts } from "./modal-actions";

import * as types from "../types";
import store from "../store";

export const setListingContacts = listingContacts => ({
  type: types.SET_LISTING_CONTACTS,
  payload: listingContacts
});

export const setListingContactsSearchResults = listingContacts => ({
  type: types.SET_LISTING_CONTACTS_SEARCH_RESULTS,
  payload: listingContacts
});

export const clearListingContactsSearchResults = () => ({
  type: types.CLEAR_LISTING_CONTACTS_SEARCH_RESULTS
});

export const searchListingContacts = values => {
  const state = store.getState();
  const listingId = state.listingReducer.listing.id;
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(
    fetchComponent("listings", [], setListingContacts, listingId, "contacts")
  );
};

export const submitListingContacts = (
  listingContactsArray,
  listingId
) => async dispatch => {
  const listingContacts = listingContactsArray.map(contact => ({
    listingId: listingId,
    contactId: contact.id
  }));
  dispatch(setSelectedContacts([]));
  dispatch(setModalVisibility(false));
  try {
    const res = await axios.post(
      `/api/listings/${listingId}/contacts/bulk-add`,
      {
        listingContacts
      }
    );
    dispatch(setListingContacts(res.data));
  } catch (err) {
    console.error("Submitting Listing Contacts Unsuccessful", err);
  }
};

export const deleteListingContact = (
  contactId,
  listingId
) => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post(`/api/listings/${listingId}/contact/delete`, {
      contactId
    });

    dispatch(setListingContacts(res.data));
    dispatch(clearListingContactsSearchResults());
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Deleting listing contact unsuccessful", err);
    dispatch(isFetching(false));
  }
};
