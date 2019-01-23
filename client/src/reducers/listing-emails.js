import axios from "axios";
import store from "../store";

const initialState = {
  listingEmails: [],
  filtered: [],
  pages: 0,
  page: 0,
  pageSize: 20,
  loading: false,
  pageToken: ""
};

const SET_LISTING_EMAILS = "SET_LISTING_EMAILS";
const SET_PAGE_TOKEN = "SET_PAGE_TOKEN";
const SET_PAGES = "SET_PAGES";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_FILTERED = "SET_FILTERED";

export const setListingEmails = contactEmails => ({
  type: SET_LISTING_EMAILS,
  payload: contactEmails
});

export const setPageToken = token => ({
  type: SET_PAGE_TOKEN,
  payload: token
});

export const setPages = pages => ({
  type: SET_PAGES,
  payload: pages
});

export const setPage = page => ({
  type: SET_PAGE,
  payload: page
});

export const setPageSize = pageSize => ({
  type: SET_PAGE_SIZE,
  payload: pageSize
});

export const setFiltered = filtered => ({
  type: SET_FILTERED,
  payload: filtered
});

export const init = () => {
  const state = store.getState();
  const { page, pageSize, filtered } = state.listingEmails;
  const offset = page * pageSize;
  return {
    page,
    pageSize,
    offset,
    filtered
  };
};

export const fetchListingEmails = query => async dispatch => {
  const state = store.getState();
  const { pageSize, pageToken } = state.listingEmails;
  try {
    const res = await axios.get(
      `/api/email/gmail?maxResults=${pageSize}&pageToken=${pageToken}&q=${query}`
    );
    console.log("RES.DATA", res.data);
    if (res.data.emailArray) {
      dispatch(setListingEmails(res.data.emailArray));
      dispatch(setPageToken(res.data.nextPageToken));
    }
  } catch (err) {
    console.error("Fetching emails by contact unsuccessful", err);
  }
};

export const onListingEmailsSearch = (query, contactId) => async dispatch => {
  const state = store.getState();
  const { pageSize } = state.groupContactsReducer;
  try {
    const res = await axios.get(
      `/api/contacts/${contactId}/groups/?limit=${pageSize}&offset=${0}&query=${query}`
    );
    dispatch(setListingEmails(res.data.emailArray));
    dispatch(setPageToken(res.data.nextPageToken));
  } catch (err) {
    console.error(err);
  }
};

export const onPageChange = (page, contactId) => async dispatch => {
  const { pageSize, offset, filtered } = init();
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(
      `/api/contacts/${contactId}/groups/?limit=${pageSize}&offset=${offset}&query=${query}`
    );
    dispatch(setListingEmails(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
  } catch (err) {
    console.error(err);
  }
};

export const onPageSizeChange = (pageSize, page, contactId) => async dispatch => {
  const { filtered, offset } = init();
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(
      `/api/contacts/${contactId}/groups/?limit=${pageSize}&offset=${offset}&query=${query}`
    );
    dispatch(setListingEmails(res.data.rows));
    // dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    // dispatch(setPage(page));
    // dispatch(setPageSize(pageSize));
  } catch (err) {
    console.error(err);
  }
};

export const onFilteredChange = (filtered, contactId) => async dispatch => {
  const { pageSize } = init();
  const query = filtered.length ? filtered[0].value : "";
  try {
    dispatch(setFiltered(filtered));
    const res = await axios.get(
      `/api/contacts/${contactId}/groups/?limit=${pageSize}&offset=${0}&query=${query}`
    );
    dispatch(setListingEmails(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
  } catch (err) {
    console.error(err);
  }
};

const contactEmailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTING_EMAILS:
      return {
        ...state,
        listingEmails: action.payload
      };
    case SET_PAGE_TOKEN:
      return {
        ...state,
        pageToken: action.payload
      };
    case SET_PAGES:
      return {
        ...state,
        pages: action.payload
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload
      };
    case SET_FILTERED:
      return {
        ...state,
        filtered: action.payload
      };
    default:
      return state;
  }
};

export default contactEmailsReducer;
