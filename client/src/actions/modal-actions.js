import axios from "axios";
import store from "../store";
import * as types from "../types";

export const setSelected = items => ({
  type: types.SET_SELECTED,
  payload: items
});

// DO NOT MAP DISPATCH TO THESE FUNCTIONS AT CALL SITE
export const addSelected = item => {
  const state = store.getState();
  const selected = state.modalReducer.selected.slice();
  if (!selected.includes(item)) selected.push(item);
  store.dispatch(setSelected(selected));
};

export const deleteSelected = item => {
  const state = store.getState();
  const selected = state.modalReducer.selected.slice();
  selected.splice(selected.indexOf(item));
  store.dispatch(setSelected(selected));
};
