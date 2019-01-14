import axios from "axios";
import store from "../store";
import { setSelected } from "./group-contacts-search";

const initialState = {
  data: [],
  pages: 0,
  page: 0,
  pageSize: 20,
  offset: 0,
  loading: false,
  query: "",
  filtered: []
};

const SET_GROUP_CONTACTS = "SET_GROUP_CONTACTS";
const SET_PAGES = "SET_PAGES";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_FILTERED = "SET_FILTERED";

export const setGroupContacts = data => ({
  type: SET_GROUP_CONTACTS,
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

export const fetchGroupContacts = groupId => async dispatch => {
  const state = store.getState();
  const { page, pageSize } = state.groupContactsReducer;

  try {
    const res = await axios.get(
      `/api/groups/${groupId}/contacts/?limit=${pageSize}&offset=${page * pageSize}`
    );
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setGroupContacts(res.data.rows));
  } catch (err) {
    console.error(err);
  }
};

export const onPageChange = (page, groupId) => async dispatch => {
  const state = store.getState();
  const { pageSize, filtered } = state.groupContactsReducer;
  const offset = page * pageSize;
  const query = filtered.length ? filtered[0].value : "";

  try {
    const res = await axios.get(
      `/api/groups/${groupId}/contacts/?limit=${pageSize}&offset=${offset}&query=${query}`
    );
    dispatch(setGroupContacts(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
  } catch (err) {
    console.error(err);
  }
};

export const onPageSizeChange = (pageSize, page, groupId) => async dispatch => {
  const state = store.getState();
  const { filtered } = state.groupContactsReducer;
  const offset = page * pageSize;
  const query = filtered.length ? filtered[0].value : "";
  try {
    const res = await axios.get(
      `/api/groups/${groupId}/contacts/?limit=${pageSize}&offset=${offset}&query=${query}`
    );
    dispatch(setGroupContacts(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
    dispatch(setPage(page));
    dispatch(setPageSize(pageSize));
  } catch (err) {
    console.error(err);
  }
};

export const onFilteredChange = (filtered, groupId) => async dispatch => {
  const state = store.getState();
  const { pageSize } = state.groupContactsReducer;
  const query = filtered.length ? filtered[0].value : "";

  try {
    dispatch(setFiltered(filtered));
    const res = await axios.get(
      `/api/groups/${groupId}/contacts/?limit=${pageSize}&offset=${0}&query=${query}`
    );
    dispatch(setGroupContacts(res.data.rows));
    dispatch(setPages(Math.ceil(res.data.count / pageSize)));
  } catch (err) {
    console.error(err);
  }
};

export const submitGroupContacts = (groupContactsArray, group) => async dispatch => {
  const groupContacts = groupContactsArray.map(contact => ({
    groupId: group.id,
    contactId: contact.id
  }));
  try {
    const res = await axios.post(`/api/groups/${group.id}/contacts/?limit=${20}&offset=${0}`, {
      groupContacts
    });
    dispatch(setGroupContacts(res.data.rows));
    dispatch(setSelected([]));
  } catch (err) {
    console.error("Submitting Group Contacts Unsuccessful", err);
  }
};

export const deleteGroupContact = (contactId, groupId) => async dispatch => {
  const state = store.getState();
  const { page, pageSize } = state.groupContactsReducer;
  const offset = page * pageSize;
  try {
    const res = await axios.delete(
      `/api/groups/${groupId}/contact/?contactId=${contactId}&limit=${pageSize}&offset=${offset}`
    );
    dispatch(setGroupContacts(res.data.rows));
  } catch (err) {
    console.error("Submitting Group Contact Unsuccessful", err);
  }
};

const groupContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUP_CONTACTS:
      return {
        ...state,
        groupContacts: action.payload
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
