import axios from "axios";
import * as types from "../types";
import store from "../store";

import { searchListings, setListings } from "./listing-actions";
import { fetchComponent, setQuery, setOffset, setCount } from "./query-actions";
import { setSelected } from "./modal-actions";
import { isFetching, clearFormData } from "./common-actions";

export const setContactListings = listings => ({
  type: types.SET_CONTACT_LISTINGS,
  payload: listings
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

export const setDiffedContactListings = listings => dispatch => {
  const state = store.getState();
  const contactListings = state.contactReducer.contactListings;
  listings = listings.slice();
  contactListings.forEach(contactListing => {
    listings.forEach(listing => {
      if (contactListing.id == listing.id) {
        listing.disabled = true;
      }
    });
  });
  dispatch(setListings(listings));
};

export const searchDiffedContactListings = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("listings", [], setDiffedContactListings));
};

export const submitContactListings = (
  contactListingsArray,
  contactId
) => async dispatch => {
  const contactListings = contactListingsArray.map(listing => ({
    contactId,
    listingId: listing.id
  }));
  dispatch(setSelected([]));
  try {
    const res = await axios.post(`/api/contacts/${contactId}/listings/add`, {
      contactListings
    });
    dispatch(setContactListings(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Contact Listings Unsuccessful", err);
  }
};

export const deleteContactListing = (
  listingId,
  contactId
) => async dispatch => {
  try {
    const res = await axios.post(`/api/contacts/${contactId}/listing/delete`, {
      listingId
    });
    dispatch(setContactListings(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Deleting Contact Listing Unsuccessful", err);
  }
};
