import axios from "axios";
import * as types from "../types";

/* ------------   ACTION CREATORS     ------------------ */

export const setEmails = (emails, pageToken) => ({
  type: types.SET_EMAILS,
  emails,
  pageToken
});

export const setEmail = email => {
  console.log("SET EMAIL", email.html);
  return {
    type: types.SET_EMAIL,
    email
  };
};

// END OF TESTING FOR NOW HERE....

export const setEmailsByContact = (emailsByContact, pageToken) => ({
  type: types.SET_EMAILS_BY_CONTACT,
  emailsByContact,
  pageToken
});

export const setEmailQuery = emailQuery => ({
  type: types.SET_EMAIL_QUERY,
  emailQuery
});

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  isFetching: bool
});

export const isLoading = bool => ({
  type: types.IS_LOADING,
  isLoading: bool
});

export const clearEmails = () => ({
  type: types.CLEAR_EMAILS
});

export const clearEmail = () => ({
  type: types.CLEAR_EMAIL
});

export const setError = error => ({
  type: types.SET_ERROR,
  error
});

export const clearError = () => ({
  type: types.CLEAR_ERROR
});

/* ------------       DISPATCHERS     ------------------ */

export const fetchEmails = (
  maxResults,
  pageToken,
  emailsArray
) => async dispatch => {
  if (!pageToken) dispatch(isFetching(true));
  dispatch(isLoading(true));

  try {
    const res = await axios.get(
      `/api/email/gmail?maxResults=${maxResults}&pageToken=${pageToken}`
    );

    dispatch(
      setEmails(emailsArray.concat(res.data.emailArray), res.data.nextPageToken)
    );

    dispatch(isFetching(false));
    dispatch(isLoading(false));
  } catch (err) {
    console.error("Fetching emails from gmail unsuccessful", err.response.data);
    dispatch(
      setError(
        `Fetching emails from Gmail unsuccessful: (${
          err.response.data.error.code
        }, ${err.response.data.error.errors[0].message})`
      )
    );
    dispatch(isFetching(false));
  }
};

export const fetchEmail = id => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get(`/api/email/gmail/${id}`);
    dispatch(setEmail(res.data));
    dispatch(isFetching(false));
    // dispatch(getNextPageToken(res.data.nextPageToken))
  } catch (err) {
    console.error("Fetching single email unsuccessful", err);
    dispatch(isFetching(false));
  }
};

export const fetchEmailsByContact = (
  query,
  maxResults,
  pageToken,
  emailsArray
) => async dispatch => {
  dispatch(isLoading(true));
  try {
    const res = await axios.get(
      `/api/email/gmail?maxResults=${maxResults}&pageToken=${pageToken}&q=${query}`
    );
    dispatch(
      setEmailsByContact(
        emailsArray.concat(res.data.emailArray),
        res.data.nextPageToken
      )
    );
    dispatch(isLoading(false));
  } catch (err) {
    console.error("Fetching emails by contact unsuccessful", err);
    dispatch(setError("ERROR FETCHING EMAILS BY CONTACT"));
    dispatch(isLoading(false));
  }
};
