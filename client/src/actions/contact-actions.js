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

// export const searchContacts = values => {
//   const query = values.nativeEvent.target.defaultValue;
//   store.dispatch(setQuery(query));
//   store.dispatch(setOffset(0));
//   store.dispatch(fetchComponent("contacts", [], setContacts, null, null));
//   if (!query.length) {
//     // store.dispatch(setIsSearching(false));
//   }
// };

// SYNC GOOGLE CONTACTS
export const syncContacts = () => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get("/api/sync/google-contacts");
    dispatch(setContacts(res.data.rows));
    dispatch(setCount(res.data.count));
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
    const res = await axios.post("/api/contacts", data);
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
    const res = await axios.patch(`/api/contacts/${id}`, values);
    dispatch(setContact(res.data));
  } catch (err) {
    console.error("Updating Contact Unsuccessful", err);
  }
};

export const deleteContact = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/contacts/${id}`);
    dispatch(setContact(res.data));
    dispatch(push("/contacts"));
  } catch (err) {
    console.error("Deleting Contact Unsuccessful", err);
  }
};

// CONTACT GROUPS
export const fetchContactGroups = contactId => async dispatch => {
  try {
    const res = await axios.post(`/api/contacts/groups`, {
      contactId
    });
    dispatch(setContactGroups(res.data));
  } catch (err) {
    console.error("Fetching contact groups from API unsuccessful", err);
  }
};

// CONTACT IMAGES
export const onDrop = (files, componentId) => async dispatch => {
  try {
    const uploadConfig = await axios.post("/api/upload", {
      componentType: "contact",
      componentId
    });

    await axios.put(uploadConfig.data.url, files[0], {
      headers: {
        "Content-Type": files[0].type
      }
    });

    const res = await axios.post(`/api/contacts/${componentId}/images`, {
      images: [`https://s3.amazonaws.com/leadcloud-v5-user-images/${uploadConfig.data.key}`]
    });
    dispatch(setContact(res.data));
  } catch (err) {
    console.error("Error Uploading Image", err);
  }
};

export const deleteContactImage = (image, contactId) => async dispatch => {
  try {
    const res = await axios.delete(
      `/api/contacts/${contactId}/image?imageURI=${encodeURIComponent(image)}`
    );
    dispatch(setContact(res.data));
  } catch (err) {
    console.error(err);
  }
};
