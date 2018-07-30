import axios from "axios";
import store from "../store";
import * as types from "../types";

export const setModalVisibility = bool => ({
  type: types.SET_MODAL_VISIBILITY,
  payload: bool
});

