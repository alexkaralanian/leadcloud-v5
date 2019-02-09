import axios from "axios";
import { push } from "react-router-redux";

import store from "../store";

const SET_GROUPS = "SET_GROUPS";
const SET_PAGES = "SET_PAGES";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_FILTERED = "SET_FILTERED";

export const setGroups = group => ({
  type: SET_GROUPS,
  payload: group
});

const initialState = {
  groups: [],
  filtered: [],
  pages: 0,
  page: 0,
  pageSize: 20,
  loading: false
};

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
  const { page, pageSize, filtered } = state.groups;
  const offset = page * pageSize;
  return {
    page,
    pageSize,
    offset,
    filtered
  };
};

export const fetchGroups = () => async dispatch => {
  const { pageSize, offset } = init();
  try {
    const res = await axios.get(`/api/groups/?limit=${pageSize}&offset=${offset}`);
    console.log("RESPONSE", res.data);
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setGroups(res.data.rows));
  } catch (err) {
    console.error(err);
  }
};

export const onPageChange = page => async dispatch => {
  const { pageSize, offset, filtered } = init();
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(`/api/groups/?limit=${pageSize}&offset=${offset}&query=${query}`);

    dispatch(setGroups(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
  } catch (err) {
    console.error(err);
  }
};

export const onPageSizeChange = (pageSize, page) => async dispatch => {
  const { filtered, offset } = init();
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(`/api/groups/?limit=${pageSize}&offset=${offset}&query=${query}`);
    dispatch(setGroups(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
    dispatch(setPageSize(pageSize));
  } catch (err) {
    console.error(err);
  }
};

export const onFilteredChange = filtered => async dispatch => {
  const { pageSize } = init();
  const query = filtered.length ? filtered[0].value : "";
  try {
    dispatch(setFiltered(filtered));
    const res = await axios.get(`/api/groups/?limit=${pageSize}&offset=${0}&query=${query}`);
    dispatch(setGroups(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
  } catch (err) {
    console.error(err);
  }
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload
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

export default groupsReducer;
