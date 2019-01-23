import axios from "axios";
import { push } from "react-router-redux";

const SET_GROUP = "SET_GROUP";

export const setGroup = group => ({
  type: SET_GROUP,
  payload: group
});

const initialState = {
  group: {}
};

export const fetchGroup = id => async dispatch => {
  // dispatch(isFetching(true));
  try {
    const res = await axios.get(`/api/groups/${id}`);
    dispatch(setGroup(res.data));
    // dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    // dispatch(isFetching(false));
  }
};

export const submitNewGroup = data => async dispatch => {
  // dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/groups", data);
    dispatch(setGroup(res.data));
    // dispatch(isFetching(false));
    dispatch(push(`/groups/${res.data.id}`));
  } catch (err) {
    console.error("Submitting new group unsuccessful", err);
    // dispatch(isFetching(false));
    // dispatch(setError("ERROR SUBMITTING NEW GROUP"));
  }
};

// UPDATE GROUP
export const updateGroup = (values, id) => async dispatch => {
  try {
    const res = await axios.patch(`/api/groups/${id}`, values);
    dispatch(setGroup(res.data));
  } catch (err) {
    console.error("Updating Group Unsuccessful", err);
  }
};

// DELETE GROUP
export const deleteGroup = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/groups/${id}`);
    dispatch(setGroup(res.data));
    dispatch(push("/groups"));
  } catch (err) {
    console.error("Deleting Group Unsuccessful", err);
  }
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload
      };
    default:
      return state;
  }
};

export default groupReducer;
