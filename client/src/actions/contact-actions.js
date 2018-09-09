import axios from "axios";
import { push } from "react-router-redux";

import * as types from "../types";
import store from "../store";

import { setError, isFetching } from "./common-actions";

import { fetchComponent, setQuery, setCount, setOffset } from "./query-actions";

import { setContactGroups } from "./contact-groups-actions";

export const setContacts = contacts => ({
  type: types.SET_CONTACTS,
  payload: contacts
});

export const setContact = contact => ({
  type: types.SET_CONTACT,
  contact
});

/* ------------       DISPATCHERS     ------------------ */

export const searchContacts = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("contacts", [], setContacts, null, null));
};

// SYNC GOOGLE CONTACTS
export const syncContacts = () => async dispatch => {
  const state = store.getState();
  const limit = state.queryReducer.limit;
  const offset = state.queryReducer.offset;
  const newOffset = offset + limit;

  dispatch(isFetching(true));
  try {
    const res = await axios.get("/api/google/sync-contacts");

    dispatch(setContacts(res.data.rows));
    dispatch(setCount(res.data.count));
    dispatch(setOffset(25));

    dispatch(isFetching(false));
  } catch (err) {
    console.error("Syncing Contacts Unsuccessful", err);
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
