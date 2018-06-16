import axios from "axios";
import { push } from "react-router-redux";
import * as types from "../types";
import { setListingContactsSearchResults } from "./listing-contacts-actions";

export const setContacts = (contacts, limit, offset, query) => ({
  type: types.SET_CONTACTS,
  contacts,
  limit,
  offset,
  query
});

export const setContact = contact => ({
  type: types.SET_CONTACT,
  contact
});

export const setContactsQuery = query => ({
  type: types.SET_CONTACTS_QUERY,
  payload: query
});

const setContactGroups = contactGroups => ({
  type: types.SET_CONTACT_GROUPS,
  payload: contactGroups
});

export const setContactImages = images => ({
  type: types.SET_CONTACT_IMAGES,
  payload: images
});

export const submitSuccess = () => ({
  type: types.FORM_SUBMIT_SUCCESS
});

// ADMINISTRATIVE ACTIONS

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  isFetching: bool
});

export const isLoading = bool => ({
  type: types.IS_LOADING,
  isLoading: bool
});

export const clearContact = () => ({
  type: types.CLEAR_CONTACT
});

export const clearContacts = () => ({
  type: types.CLEAR_CONTACTS
});

export const setError = error => ({
  type: types.SET_ERROR,
  error
});

export const clearError = () => ({
  type: types.CLEAR_ERROR
});

/* ------------       DISPATCHERS     ------------------ */

// SEARCH CONTACTS

export const searchContacts = (
  contacts,
  limit,
  offset,
  query,
  section
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/contacts/?limit=${limit}&offset=${offset}&query=${query}`
    );

    if (section === "listingContacts") {
      dispatch(setListingContactsSearchResults(res.data));
    } else {
      dispatch(setContacts(res.data, limit, limit, ""));
    }
  } catch (err) {
    console.error("fetchContacts ERROR", err.response);
    dispatch(setError("ERROR FETCHING CONTACTS"));
  }
};

// FETCH CONTACTS
export const fetchContacts = (
  contacts,
  limit,
  offset,
  query
) => async dispatch => {
  // if (!offset) dispatch(isFetching(true));

  dispatch(isLoading(true));
  const newOffset = offset + limit;
  try {
    const res = await axios.get(
      `/api/contacts/?limit=${limit}&offset=${offset}&query=${query}`
    );
    dispatch(setContacts(contacts.concat(res.data), limit, newOffset, query));
    dispatch(isFetching(false));
    dispatch(isLoading(false));
  } catch (err) {
    console.error("fetchContacts ERROR", err.response);
    dispatch(isFetching(false));
    dispatch(setError("ERROR FETCHING CONTACTS"));
  }
};

// SYNC GOOGLE CONTACTS
export const syncContacts = (limit, offset, query) => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get("/api/contacts/loadcontacts");
    if (res.status === 200) {
      dispatch(fetchContacts(limit, offset));
    }
  } catch (err) {
    console.error("Loading contacts from DB unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR LOADING CONTACTS"));
  }
};

// FETCH CONTACT
export const fetchContact = id => async dispatch => {
  try {
    const res = await axios.get(`/api/contacts/${id}`);
    dispatch(setContact(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching contact unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR FETCHING CONTACT"));
  }
};

// CREATE NEW CONTACT
export const submitNewContact = data => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/contacts/new", data);
    if (res.status === 200) {
      dispatch(setContact(res.data));
      dispatch(push(`/contact/${res.data.id}`));
    }
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Submitting new contact unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR SUBMITTING NEW CONTACT"));
  }
};

// CREATE NEW OPEN HOUSE CONTACT
export const submitNewOpenHouseContact = data => async dispatch => {
  console.log("DATA", data);
  try {
    const res = await axios.post("/api/contacts/new/openhouse", data);
    if (res.status === 200) {
      dispatch(submitSuccess());
      console.log("SUCCESSFULLY SUBMITTED", res.data);
    }
  } catch (err) {
    console.error("Submitting new contact unsuccessful", err);
    dispatch(setError("ERROR SUBMITTING NEW CONTACT"));
  }
};

// UPDATE CONTACT
export const updateContact = (values, id) => async dispatch => {
  try {
    const res = await axios.patch(`/api/contacts/${id}/update`, values);
    dispatch(setContact(res.data));
  } catch (err) {
    console.error("Updating Contact Unsuccessful", err);
  }
};

export const deleteContact = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/contacts/${id}/delete`);
    dispatch(setContact(res.data));
    dispatch(push("/contacts"));
  } catch (err) {
    console.error("Deleting Contact Unsuccessful", err);
  }
};

// GROUPS
export const fetchContactGroups = contactGroups => async dispatch => {
  try {
    console.log("FETCHING CONTACT GROUPS", contactGroups);
    const res = await axios.post(`/api/contacts/groups`, {
      contactGroups
    });
    console.log("FETCHING RES", res.data);
    dispatch(setContactGroups(res.data));
  } catch (err) {
    console.error("Fetching contact groups from API unsuccessful", err);
  }
};

// CONTACT IMAGES
export const onDrop = (files, componentId) => async dispatch => {
  const uploadConfig = await axios.post("/api/upload", {
    componentType: "contact",
    componentId
  });

  await axios.put(uploadConfig.data.url, files[0], {
    headers: {
      "Content-Type": files[0].type
    }
  });

  const res = await axios.post("/api/contacts/images", {
    images: [
      `https://s3.amazonaws.com/leadcloud-v5-user-images/${
        uploadConfig.data.key
      }`
    ],
    componentId
  });

  dispatch(setContact(res.data));
};

export const deleteContactImage = (image, contactId) => async dispatch => {
  try {
    const res = await axios.post("/api/contacts/images/delete", {
      contactId,
      image
    });
    dispatch(setContact(res.data));
  } catch (err) {
    console.error(err);
  }
};
