import axios from "axios";
import * as types from "../types";
import { isFetching, isLoading, setGroups } from "./group-actions";

// Group Contacts
export const setContactGroups = contactGroups => ({
  type: types.SET_CONTACT_GROUPS,
  payload: contactGroups
});

export const submitContactGroup = (
  contactGroupId,
  contactId
) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/groups/${contactGroupId}/contact-groups/add`,
      {
        contactGroupId,
        contactId
      }
    );

    dispatch(setContactGroups(res.data));
  } catch (err) {
    console.error("Submitting Contact Group Unsuccessful", err);
  }
};

export const deleteContactGroup = (
  contactGroupId,
  contactId
) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/groups/${contactGroupId}/contact-groups/delete`,
      {
        contactGroupId,
        contactId
      }
    );

    dispatch(setContactGroups(res.data));
  } catch (err) {
    console.error("Submitting Contact Group Unsuccessful", err);
  }
};
