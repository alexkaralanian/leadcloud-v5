import axios from "axios";
import store from "../store";

const initialState = {
  listingContacts: [],
  filtered: [],
  pages: 0,
  page: 0,
  pageSize: 20,
  loading: false
};

const SET_LISTING_CONTACTS = "SET_LISTING_CONTACTS";
const SET_PAGES = "SET_PAGES";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_FILTERED = "SET_FILTERED";

export const setListingContacts = data => ({
  type: SET_LISTING_CONTACTS,
  payload: data
});

// REACT TABLE
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

export const fetchListingContacts = listingId => async dispatch => {
  const state = store.getState();
  const { page, pageSize } = state.listingContacts;
  try {
    const res = await axios.get(
      `/api/listings/${listingId}/contacts/?limit=${pageSize}&offset=${page * pageSize}`
    );
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setListingContacts(res.data.rows));
  } catch (err) {
    console.error(err);
  }
};

export const submitListingContacts = (listingContactsArray, group) => async dispatch => {
  const listingContacts = listingContactsArray.map(contact => ({
    listingId: group.id,
    contactId: contact.id
  }));
  try {
    const res = await axios.post(`/api/listings/${group.id}/contacts/?limit=${20}&offset=${0}`, {
      listingContacts
    });
    dispatch(setListingContacts(res.data.rows));
    dispatch(setSelected([]));
  } catch (err) {
    console.error("Submitting Group Contacts Unsuccessful", err);
  }
};

export const deleteListingContact = (contactId, listingId) => async dispatch => {
  const state = store.getState();
  const { page, pageSize } = state.listingContacts;
  const offset = page * pageSize;
  try {
    const res = await axios.delete(
      `/api/listings/${listingId}/contacts/?contactId=${contactId}&limit=${pageSize}&offset=${offset}`
    );
    dispatch(setListingContacts(res.data.rows));
  } catch (err) {
    console.error("Submitting Group Contact Unsuccessful", err);
  }
};

// REACT TABLE
export const onPageChange = (page, listingId) => async dispatch => {
  const state = store.getState();
  const { pageSize, filtered } = state.listingContacts;
  const offset = page * pageSize;
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(
      `/api/listings/${listingId}/contacts/?limit=${pageSize}&offset=${offset}&query=${query}`
    );
    dispatch(setListingContacts(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
  } catch (err) {
    console.error(err);
  }
};

export const onPageSizeChange = (pageSize, page, listingId) => async dispatch => {
  const state = store.getState();
  const { filtered } = state.listingContacts;
  const offset = page * pageSize;
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(
      `/api/listings/${listingId}/contacts/?limit=${pageSize}&offset=${offset}&query=${query}`
    );
    dispatch(setListingContacts(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
    dispatch(setPageSize(pageSize));
  } catch (err) {
    console.error(err);
  }
};

export const onFilteredChange = (filtered, listingId) => async dispatch => {
  const state = store.getState();
  const { pageSize } = state.listingContacts;
  const query = filtered.length ? filtered[0].value : "";
  try {
    dispatch(setFiltered(filtered));
    const res = await axios.get(
      `/api/listings/${listingId}/contacts/?limit=${pageSize}&offset=${0}&query=${query}`
    );
    dispatch(setListingContacts(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const listingContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTING_CONTACTS:
      return {
        ...state,
        listingContacts: action.payload
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

export default listingContactsReducer;
