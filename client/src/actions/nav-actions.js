import * as types from "../types";

export const setActiveKey = activeKey => ({
  type: types.SET_ACTIVE_KEY,
  payload: activeKey
});
