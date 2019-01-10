import axios from "axios";
import * as types from "../types";
import store from "../store";

import { fetchComponent, setQuery, setOffset, setCount } from "./query-actions";

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
  store.dispatch(fetchComponent("contacts", [], setContactListings, contactId, "listings"));
};

export const submitContactListings = (contactListingsArray, contact) => async dispatch => {
  const contactListings = contactListingsArray.map(listing => ({
    contactId: contact.id,
    listingId: listing.id
  }));
  try {
    const res = await axios.post(`/api/contacts/${contact.id}/listings`, {
      contactListings
    });
    dispatch(setContactListings(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Contact Listings Unsuccessful", err);
  }
};

export const deleteContactListing = (listing, contact) => async dispatch => {
  try {
    const res = await axios.delete(`/api/contacts/${contact.id}/listing?listingId=${listing.id}`);
    dispatch(setContactListings(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Deleting Contact Listing Unsuccessful", err);
  }
};
