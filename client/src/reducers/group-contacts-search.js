import axios from "axios";
import store from "../store";

const initialState = {
  selected: [],
  isLoading: false,
  options: [],
  limit: 20
};

const SET_CONTACTS = "SET_CONTACTS";
const SET_SELECTED = "SET_SELECTED";
const SET_IS_LOADING = "SET_IS_LOADING";
const SET_OPTIONS = "SET_OPTIONS";

export const isLoading = bool => ({
  type: SET_IS_LOADING,
  payload: bool
});

export const setOptions = data => ({
  type: SET_OPTIONS,
  payload: data
});

export const setSelected = data => ({
  type: SET_SELECTED,
  payload: data
});

export const diffGroupContacts = allContacts => {
  const state = store.getState();
  const { groupContacts } = state.groupContactsReducer;
  const map = {};
  groupContacts.forEach(contact => {
    map[contact.id] = contact;
  });
  allContacts.forEach(contact => {
    if (map[contact.id]) delete map[contact.id];
    else map[contact.id] = contact;
  });
  return Object.values(map);
};

export const searchGroupContacts = query => async dispatch => {
  const state = store.getState();
  const { limit } = state.groupContactsSearch;

  try {
    dispatch(isLoading(true));
    const res = await axios.get(`/api/contacts/?limit=${limit}&offset=${0}&query=${query}`);
    const diffedContacts = diffGroupContacts(res.data.rows);
    dispatch(isLoading(false));
    dispatch(setOptions(diffedContacts));
  } catch (err) {
    console.error(err);
  }
};

export const fetchContacts = () => async dispatch => {
  try {
    const res = await axios.get(`/api/contacts/?limit=${20}&offset=${0}`);
    dispatch(setOptions(res.data.rows));
  } catch (err) {
    console.error(err);
  }
};

export const groupContactsSearch = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_OPTIONS:
      return {
        ...state,
        options: action.payload
      };

    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload
      };
    default:
      return state;
  }
};

export default groupContactsSearch;
