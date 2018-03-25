import axios from "axios";
import * as types from "../types";

/* ------------   ACTION CREATORS     ------------------ */

const setEmails = (emails, pageToken) => ({
  type: types.SET_EMAILS,
  emails,
  pageToken
});

// const setEmail = email => ({
//   type: types.SET_EMAIL,
//   email
// });

// export const setEmailQuery = emailQuery => ({
//   type: types.SET_EMAIL_QUERY,
//   emailQuery
// });

// const setEmailsByContact = (emailsByContact, pageToken) => ({
//   type: types.SET_EMAILS_BY_CONTACT,
//   emailsByContact,
//   pageToken
// });

// export const clearEmails = () => ({
//   type: types.CLEAR_EMAILS
// });

// export const clearEmail = () => ({
//   type: types.CLEAR_EMAIL
// });

const isFetching = bool => ({
  type: types.IS_FETCHING,
  isFetching: bool
});

const isLoading = bool => ({
  type: types.IS_LOADING,
  isLoading: bool
});

// const setError = error => ({
//   type: types.SET_ERROR,
//   error
// });

// export const clearError = () => ({
//   type: types.CLEAR_ERROR
// });

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
    console.log('EMAILS!', res.data)

    dispatch(
      setEmails(emailsArray.concat(res.data.emailArray), res.data.nextPageToken)
    );
    dispatch(isFetching(false));
    dispatch(isLoading(false));
  } catch (err) {
    console.error("Fetching emails from gmail unsuccessful", err);
    dispatch(isFetching(false));
  }
};

// export const fetchEmail = id => async dispatch => {
//   dispatch(isFetching(true));
//   try {
//     const res = await axios.get(`/api/email/gmail/${id}`);
//     dispatch(setEmail(res.data));
//     dispatch(isFetching(false));
//     // dispatch(getNextPageToken(res.data.nextPageToken))
//   } catch (err) {
//     console.error("Fetching single email unsuccessful", err);
//     dispatch(isFetching(false));
//   }
// };

// export const fetchEmailsByContact = (
//   query,
//   maxResults,
//   pageToken,
//   emailsArray
// ) => async dispatch => {
//   console.log({ query, maxResults, pageToken, emailsArray });
//   dispatch(isLoading(true));
//   try {
//     const res = await axios.get(
//       `/api/email/gmail?maxResults=${maxResults}&pageToken=${pageToken}&q=${
//         query
//       }`
//     );
//     console.log("RES", res.data);
//     dispatch(
//       setEmailsByContact(
//         emailsArray.concat(res.data.emailArray),
//         res.data.nextPageToken
//       )
//     );
//     dispatch(isLoading(false));
//   } catch (err) {
//     console.error("Fetching emails by contact unsuccessful", err);
//     dispatch(setError("ERROR FETCHING EMAILS BY CONTACT"));
//     dispatch(isLoading(false));
//   }
// };
