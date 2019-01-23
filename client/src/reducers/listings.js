import axios from "axios";
import store from "../store";

const initialState = {
  listings: [],
  filtered: [],
  pages: 0,
  page: 0,
  pageSize: 20,
  loading: false
};

const SET_LISTINGS = "SET_LISTINGS";
const SET_PAGES = "SET_PAGES";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_FILTERED = "SET_FILTERED";

export const setListings = data => ({
  type: SET_LISTINGS,
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

export const fetchListings = () => async dispatch => {
  const state = store.getState();
  const { page, pageSize } = state.listings;

  try {
    const res = await axios.get(`/api/listings/?limit=${pageSize}&offset=${page * pageSize}`);
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    console.log("RESPONSE", res.data);
    dispatch(setListings(res.data.rows));
  } catch (err) {
    console.error(err);
  }
};

export const onPageChange = page => async dispatch => {
  const state = store.getState();
  const { pageSize, filtered } = state.listings;
  const offset = page * pageSize;
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(`/api/listings/?limit=${pageSize}&offset=${offset}&query=${query}`);
    dispatch(setListings(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
  } catch (err) {
    console.error(err);
  }
};

export const onPageSizeChange = (pageSize, page) => async dispatch => {
  const state = store.getState();
  const { filtered } = state.listings;
  const offset = page * pageSize;
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(`/api/listings/?limit=${pageSize}&offset=${offset}&query=${query}`);
    dispatch(setListings(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
    dispatch(setPageSize(pageSize));
  } catch (err) {
    console.error(err);
  }
};

export const onSearch = query => async dispatch => {
  const state = store.getState();
  const { pageSize } = state.listings;
  try {
    const res = await axios.get(`/api/listings/?limit=${pageSize}&offset=${0}&query=${query}`);
    dispatch(setListings(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
  } catch (err) {
    console.error(err);
  }
};

export const onFilteredChange = filtered => async dispatch => {
  const state = store.getState();
  const { pageSize } = state.listings;
  const query = filtered.length ? filtered[0].value : "";
  try {
    dispatch(setFiltered(filtered));
    const res = await axios.get(`/api/listings/?limit=${pageSize}&offset=${0}&query=${query}`);
    dispatch(setListings(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const listingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTINGS:
      return {
        ...state,
        listings: action.payload
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

export default listingsReducer;
