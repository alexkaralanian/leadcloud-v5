import axios from "axios";
import { push } from "react-router-redux";
import store from "../store";
import * as types from "../types";

import { isFetching, setError, clearError } from "./common-actions";
import { setContactListingsSearchResults } from "./contact-listings-actions";
import { setCampaignListingsSearchResults } from "./campaign-listings-actions";
import { fetchComponent, setQuery, setOffset } from "./query-actions";

export const setListings = listings => ({
  type: types.SET_LISTINGS,
  payload: listings
});

export const setListing = listing => ({
  type: types.SET_LISTING,
  payload: listing
});

export const searchListings = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("listings", [], setListings));
};

export const fetchListing = id => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get(`/api/listings/${id}`);

    dispatch(setListing(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching listing unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR FETCHING LISTING"));
  }
};

export const submitNewListing = data => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/listings/new", data);

    dispatch(setListing(res.data));
    dispatch(push(`/listings/${res.data.id}`));

    dispatch(isFetching(false));
  } catch (err) {
    console.error("Submitting new listing unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR SUBMITTING NEW LISTING"));
  }
};

export const updateListing = (values, id) => async dispatch => {
  try {
    const res = await axios.patch(`/api/listings/${id}/update`, values);
    dispatch(setListing(res.data));
  } catch (err) {
    console.error("Updating Listing Unsuccessful", err);
  }
};

export const deleteListing = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/listings/${id}/delete`);
    dispatch(setListing(res.data));
    dispatch(push("/listings"));
  } catch (err) {
    console.error("Deleting Listing Unsuccessful", err);
  }
};

// LISTING IMAGES

export const onDrop = (files, componentId) => async dispatch => {
  const uploadConfig = await axios.post("/api/upload", {
    componentType: "listing",
    componentId
  });

  await axios.put(uploadConfig.data.url, files[0], {
    headers: {
      "Content-Type": files[0].type
    }
  });

  const res = await axios.post("/api/listings/images", {
    images: [
      `https://s3.amazonaws.com/leadcloud-v5-user-images/${
        uploadConfig.data.key
      }`
    ],
    componentId
  });

  dispatch(setListing(res.data));
};

export const deleteListingImage = (image, listingId) => async dispatch => {
  try {
    const res = await axios.post("/api/listings/images/delete", {
      listingId,
      image
    });
    dispatch(setListing(res.data));
  } catch (err) {
    console.error(err);
  }
};
