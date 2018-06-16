import axios from "axios";
import { searchListings } from "./listing-actions";
import { isFetching } from "./contact-actions";
import * as types from "../types";
import store from "../store";

const state = store.getState();

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

export const submitSuccess = () => ({
  type: types.FORM_SUBMIT_SUCCESS
});

export const searchContactListings = values => {
  const query = values.nativeEvent.target.defaultValue;
  const contactListingsSearchResults =
    state.contactReducer.contactListingsSearchResults;

  if (query.length < 1) store.dispatch(clearContactListingsSearchResults());
  if (query.length >= 1) {
    store.dispatch(
      searchListings(
        contactListingsSearchResults,
        25,
        0,
        query,
        "contactListings"
      )
    );
  }

  if (!query) store.dispatch(clearContactListingsSearchResults());
};

export const fetchContactListings = contactId => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/contacts/fetchContactListings", {
      contactId
    });
    if (res.status === 200) {
      dispatch(setContactListings(res.data));
    }
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching listing contacts unsuccessful", err);
    dispatch(isFetching(false));
  }
};

export const submitContactListing = (
  listingId,
  contactId
) => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/contacts/setContactListing", {
      contactId,
      listingId
    });

    dispatch(setContactListings(res.data));
    dispatch(clearContactListingsSearchResults());
    dispatch(submitSuccess());
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Setting listing contacts unsuccessful", err);
    dispatch(isFetching(false));
  }
};

export const deleteContactListing = (
  listingId,
  contactId
) => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/contacts/deleteContactListing", {
      listingId,
      contactId
    });

    console.log("DELETE RES", res.data);

    dispatch(setContactListings(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Deleting listing contacts unsuccessful", err);
    dispatch(isFetching(false));
  }
};
