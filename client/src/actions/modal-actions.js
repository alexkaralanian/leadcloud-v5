import axios from "axios";
import store from "../store";
import * as types from "../types";

export const setModalVisibility = bool => ({
  type: types.SET_MODAL_VISIBILITY,
  payload: bool
});

export const setSelected = items => ({
  type: types.SET_SELECTED,
  payload: items
});

export const addSelected = item => {
  console.log("ADD SELECTED", item);
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
