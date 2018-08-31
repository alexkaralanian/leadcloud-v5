import * as types from "../types";

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  payload: bool
});

export const setError = error => ({
  type: types.SET_ERROR,
  error
});

export const clearError = () => ({
  type: types.CLEAR_ERROR
});

export const clearFormData = () => ({
  type: types.CLEAR_FORM_DATA
});
