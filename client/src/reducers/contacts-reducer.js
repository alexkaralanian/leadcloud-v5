import axios from "axios";
import store from "../store";

const initialState = {
  contacts: [],
  filtered: [],
  pages: 0,
  page: 0,
  pageSize: 20,
  loading: false
};

const SET_CONTACTS = "SET_CONTACTS";
const SET_PAGES = "SET_PAGES";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_FILTERED = "SET_FILTERED";

export const setContacts = data => ({
  type: SET_CONTACTS,
  payload: data
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

export const fetchContacts = () => async dispatch => {
  const state = store.getState();
  const { page, pageSize } = state.groupContactsReducer;

  try {
    const res = await axios.get(`/api/contacts/?limit=${pageSize}&offset=${page * pageSize}`);
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setContacts(res.data.rows));
  } catch (err) {
    console.error(err);
  }
};

export const onPageChange = page => async dispatch => {
  const state = store.getState();
  const { pageSize, filtered } = state.groupContactsReducer;
  const offset = page * pageSize;
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(`/api/contacts/?limit=${pageSize}&offset=${offset}&query=${query}`);
    dispatch(setContacts(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
  } catch (err) {
    console.error(err);
  }
};

export const onPageSizeChange = (pageSize, page) => async dispatch => {
  const state = store.getState();
  const { filtered } = state.groupContactsReducer;
  const offset = page * pageSize;
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(`/api/contacts/?limit=${pageSize}&offset=${offset}&query=${query}`);
    dispatch(setContacts(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
    dispatch(setPageSize(pageSize));
  } catch (err) {
    console.error(err);
  }
};

export const onFilteredChange = filtered => async dispatch => {
  const state = store.getState();
  const { pageSize } = state.groupContactsReducer;
  const query = filtered.length ? filtered[0].value : "";
  try {
    dispatch(setFiltered(filtered));
    const res = await axios.get(`/api/contacts/?limit=${pageSize}&offset=${0}&query=${query}`);
    dispatch(setContacts(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const groupContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
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

export default groupContactsReducer;
