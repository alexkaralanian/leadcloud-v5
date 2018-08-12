import axios from "axios";
import { searchListings } from "./listing-actions";
import { isFetching, clearFormData } from "./common-actions";
import { fetchComponent, setQuery, setOffset } from "./query-actions";
import { setModalVisibility, setSelectedContacts } from "./modal-actions";
import * as types from "../types";
import store from "../store";

export const setContactListings = listings => ({
  type: types.SET_CONTACT_LISTINGS,
  payload: listings
});

export const setContactListingsSearchResults = searchResults => ({
  type: types.SET_CONTACT_LISTINGS_SEARCH_RESULTS,
  payload: searchResults
});

export const clearContactListingsSearchResults = () => ({
  type: types.CLEAR_CONTACT_LISTINGS_SEARCH_RESULTS
});

export const searchContactListings = values => {
  const state = store.getState();
  const contactId = state.contactReducer.contact.id;
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(
    fetchComponent("contacts", [], setContactListings, contactId, "listings")
  );
};

export const submitContactListings = (
  contactListingsArray,
  contactId
) => async dispatch => {
  const contactListings = contactListingsArray.map(listing => ({
    contactId: contactId,
    listingId: listing.id
  }));
  dispatch(setSelectedContacts([]));
  dispatch(setModalVisibility(false));
  try {
    const res = await axios.post(
      `/api/contacts/${contactId}/listings/bulk-add`,
      {
        contactListings
      }
    );
    dispatch(setContactListings(res.data));
  } catch (err) {
    console.error("Submitting Contact Listings Unsuccessful", err);
  }
};

export const deleteContactListing = (
  listingId,
  contactId
) => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post(`/api/contacts/${contactId}/contact/delete`, {
      listingId
    });

    dispatch(setContactListings(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Deleting contact listing unsuccessful", err);
    dispatch(isFetching(false));
  }
};
