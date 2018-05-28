import axios from "axios";
import { push } from "react-router-redux";
import * as types from "../types";

export function setIsListingNew(bool) {
  return {
    type: types.IS_LISTING_NEW,
    payload: bool
  };
}

export const setListings = listings => ({
  type: types.SET_LISTINGS,
  payload: listings
});

export const setListing = listing => ({
  type: types.SET_LISTING,
  payload: listing
});

// export const setContactSearch = searchResults => ({
//   type: types.SET_CONTACT_SEARCH,
//   payload: searchResults
// });

export const setListingContacts = contacts => ({
  type: types.SET_LISTING_CONTACTS,
  payload: contacts
});

export const setListingImages = images => ({
  type: types.SET_LISTING_IMAGES,
  payload: images
});

// ADMINISTRATIVE

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  isFetching: bool
});

export const setError = error => ({
  type: types.SET_ERROR,
  error
});

export const clearError = () => ({
  type: types.CLEAR_ERROR
});

export const clearListing = () => ({
  type: types.CLEAR_LISTING
});

export const clearListings = () => ({
  type: types.CLEAR_LISTINGS
});

// ASYNC ACTION CREATORS

export const fetchListings = () => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get("/api/listings");
    if (res.status === 200) {
      dispatch(setListings(res.data));
    }
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching listings  unsuccessful", err);
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
      dispatch(setListingContacts(res.data.listingContacts));
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

// LISTING CONTACTS
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

export const submitListingContact = (
  contactId,
  listingId
) => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/listings/setListingContacts", {
      contactId,
      listingId
    });
    if (res.status === 200) {
      dispatch(setListingContacts(res.data));
    }
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
    if (res.status === 200) {
      dispatch(setListingContacts(res.data));
    }
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Setting listing contacts unsuccessful", err);
    dispatch(isFetching(false));
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
