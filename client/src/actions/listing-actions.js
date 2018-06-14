import axios from "axios";
import { push } from "react-router-redux";
import { setContactListingsSearchResults } from "./contact-listings-actions";
import * as types from "../types";

export const setListings = (listings, limit, offset, query) => ({
  type: types.SET_LISTINGS,
  listings,
  limit,
  offset,
  query
});

export const setListing = listing => ({
  type: types.SET_LISTING,
  payload: listing
});

export const setListingsQuery = query => ({
  type: types.SET_LISTING_QUERY,
  payload: query
});

// ADMINISTRATIVE

export function setIsListingNew(bool) {
  return {
    type: types.IS_LISTING_NEW,
    payload: bool
  };
}

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  isFetching: bool
});

export const clearListing = () => ({
  type: types.CLEAR_LISTING
});

export const clearListings = () => ({
  type: types.CLEAR_LISTINGS
});

export const setError = error => ({
  type: types.SET_ERROR,
  error
});

export const clearError = () => ({
  type: types.CLEAR_ERROR
});

// SEARCH LISTINGS
export const searchListings = (
  listingsArray,
  limit,
  offset,
  query,
  section
) => async dispatch => {
  console.log("SEARCH LISTINGS CALLED");
  try {
    const res = await axios.get(
      `/api/listings/?limit=${limit}&offset=${offset}&query=${query}`
    );

    if (section === "contactListings") {
      dispatch(setContactListingsSearchResults(res.data));
    } else {
      dispatch(setListings(res.data, limit, limit, null));
    }
  } catch (err) {
    console.error("fetchContacts ERROR", err.response);
    dispatch(setError("ERROR FETCHING CONTACTS"));
  }
};

// FETCH LISTINGS
export const fetchListings = (
  listingsArray,
  limit,
  offset,
  query
) => async dispatch => {
  console.log("FETCHING LISTINGS");
  console.log({
    listingsArray,
    limit,
    offset,
    query
  });

  dispatch(isFetching(true));
  const newOffset = offset + limit;
  try {
    const res = await axios.get(
      `/api/listings?limit=${limit}&offset=${offset}&query=${query}`
    );

    console.log("LISTINGS ARRAY", listingsArray.concat(res.data));
    dispatch(
      setListings(listingsArray.concat(res.data), limit, newOffset, null)
    );
    dispatch(isFetching(false));
  } catch (err) {
    console.log("fetchContacts ERROR", err.response);
    dispatch(isFetching(false));
    dispatch(setError("ERROR FETCHING LISTINGS"));
  }
};

export const fetchListing = id => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get(`/api/listings/${id}`);
    if (res.status === 200) {
      dispatch(setListing(res.data));
      // dispatch(setListingContacts(res.data.listingContacts));
      dispatch(isFetching(false));
    }
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
    if (res.status === 200) {
      dispatch(setListing(res.data));
      dispatch(setIsListingNew(false));
      dispatch(push(`/listing/${res.data.id}`));
    }
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
