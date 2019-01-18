import axios from "axios";
import store from "../store";
import { setSelected } from "./group-contacts-search";

const initialState = {
  contactGroups: [],
  filtered: [],
  pages: 0,
  page: 0,
  pageSize: 20,
  loading: false
};

const SET_CONTACT_GROUPS = "SET_CONTACT_GROUPS";
const SET_PAGES = "SET_PAGES";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_FILTERED = "SET_FILTERED";

export const setContactGroups = data => ({
  type: SET_CONTACT_GROUPS,
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

export const init = () => {
  const state = store.getState();
  const { page, pageSize, filtered } = state.groupContactsReducer;
  const offset = page * pageSize;
  return {
    page,
    pageSize,
    offset,
    filtered
  };
};

export const fetchContactGroups = contactId => async dispatch => {
  const { pageSize, offset } = init();
  try {
    const res = await axios.get(
      `/api/contacts/${contactId}/groups/?limit=${pageSize}&offset=${offset}`
    );
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setContactGroups(res.data.rows));
  } catch (err) {
    console.error(err);
  }
};

export const submitContactGroups = (selected, contactId) => async dispatch => {
  const contactGroups = selected.map(group => ({
    groupId: group.id,
    contactId
  }));
  const { pageSize, offset } = init();
  try {
    const res = await axios.post(
      `/api/contacts/${contactId}/groups/?limit=${pageSize}&offset=${offset}`,
      {
        contactGroups
      }
    );
    dispatch(setContactGroups(res.data.rows));
    dispatch(setSelected([]));
  } catch (err) {
    console.error("Submitting Contact Groups Unsuccessful", err);
  }
};

export const deleteContactGroup = (contactId, groupId) => async dispatch => {
  const { pageSize, offset } = init();
  try {
    const res = await axios.delete(
      `/api/contacts/${contactId}/group/?groupId=${groupId}&limit=${pageSize}&offset=${offset}`
    );
    dispatch(setContactGroups(res.data.rows));
  } catch (err) {
    console.error("Submitting Group Contact Unsuccessful", err);
  }
};

export const onPageChange = (page, contactId) => async dispatch => {
  const { pageSize, offset, filtered } = init();
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(
      `/api/contacts/${contactId}/groups/?limit=${pageSize}&offset=${offset}&query=${query}`
    );
    dispatch(setContactGroups(res.data.rows));
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
    dispatch(setContactGroups(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
    dispatch(setPageSize(pageSize));
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
    dispatch(setContactGroups(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
  } catch (err) {
    console.error(err);
  }
};

const contactGroupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACT_GROUPS:
      return {
        ...state,
        contactGroups: action.payload
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

export default contactGroupsReducer;
