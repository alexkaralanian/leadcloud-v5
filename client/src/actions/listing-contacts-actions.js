import axios from "axios";
import { searchContacts } from "./contact-actions";
import { isFetching } from "./listing-actions";
import { clearFormData } from "./common-actions";
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

export const fetchListingContacts = listingId => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/listings/fetchListingContacts", {
      listingId
    });
    if (res.status === 200) {
      dispatch(setListingContacts(res.data));
    }
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching listing contacts unsuccessful", err);
    dispatch(isFetching(false));
  }
};

export const searchListingContacts = values => {
  const state = store.getState();
  const query = values.nativeEvent.target.defaultValue;
  const listingContactsSearchResults =
    state.listingReducer.listingContactsSearchResults;

  if (query.length < 1) store.dispatch(clearListingContactsSearchResults());
  if (query.length >= 1) {
    store.dispatch(
      searchContacts(
        listingContactsSearchResults,
        25,
        0,
        query,
        "listingContacts"
      )
    );
  }

  if (!query) store.dispatch(clearListingContactsSearchResults());
};

export const submitListingContact = (
  contactId,
  listingId
) => async dispatch => {
  console.log("SUBMIT LISTING CONTACT");
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/listings/setListingContacts", {
      contactId,
      listingId
    });
    dispatch(setListingContacts(res.data));
    dispatch(clearListingContactsSearchResults());
    dispatch(clearFormData());
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Setting listing contacts unsuccessful", err);
    dispatch(isFetching(false));
  }
};

export const deleteListingContact = (
  contactId,
  listingId
) => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/listings/deleteListingContact", {
      contactId,
      listingId
    });

    dispatch(setListingContacts(res.data));
    dispatch(clearListingContactsSearchResults());
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Deleting listing contacts unsuccessful", err);
    dispatch(isFetching(false));
  }
};
