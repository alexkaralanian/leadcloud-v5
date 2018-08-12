import axios from "axios";
import { push } from "react-router-redux";
import store from "../store";

import * as types from "../types";
import { setListingContactsSearchResults } from "./listing-contacts-actions";
import { setGroupContactsSearchResults } from "./group-contacts-actions";
import { fetchComponent, setQuery, setOffset } from "./query-actions";

import {
  setError,
  clearError,
  isFetching,
  clearFormData
} from "./common-actions";

export const setContacts = contacts => ({
  type: types.SET_CONTACTS,
  payload: contacts
});

export const setContact = contact => ({
  type: types.SET_CONTACT,
  contact
});

const setContactGroups = contactGroups => ({
  type: types.SET_CONTACT_GROUPS,
  payload: contactGroups
});

export const setContactImages = images => ({
  type: types.SET_CONTACT_IMAGES,
  payload: images
});

// ADMINISTRATIVE ACTIONS

export const clearContact = () => ({
  type: types.CLEAR_CONTACT
});

export const clearContacts = () => ({
  type: types.CLEAR_CONTACTS
});

/* ------------       DISPATCHERS     ------------------ */

export const searchContacts = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("contacts", [], setContacts));
};

export const searchContacts2 = values => {
  const query = values.nativeEvent.target.defaultValue;
  if (query.length <= 1) {
    store.dispatch(clearContacts());
  } else {
    store.dispatch(setQuery(query));
    store.dispatch(setOffset(0));
    store.dispatch(fetchComponent("contacts", [], setContacts));
  }
};

// SYNC GOOGLE CONTACTS
export const syncContacts = () => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get("/api/contacts/loadcontacts");
    if (res.status === 200) {
      store.dispatch(fetchComponent("contacts", [], setContacts));
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
    dispatch(setContact(res.data.contact));
    dispatch(setContactGroups(res.data.contactGroups));
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
      dispatch(push(`/contacts/${res.data.id}`));
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
      dispatch(clearFormData());
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

// CONTACT GROUPS
export const fetchContactGroups = contactId => async dispatch => {
  try {
    console.log("FETCHING CONTACT GROUPS", contactId);
    const res = await axios.post(`/api/contacts/groups`, {
      contactId
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
