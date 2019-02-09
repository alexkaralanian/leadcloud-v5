import axios from "axios";
import store from "../store";

const initialState = {
  events: []
};

const SET_EVENTS = "SET_EVENTS";

export const setEvents = data => ({
  type: SET_EVENTS,
  payload: data
});

export const fetchEvents = () => async dispatch => {
  try {
    const res = await axios.get(`/api/events`);
    dispatch(setEvents(res.data.rows));
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        contacts: action.payload
      };

    default:
      return state;
  }
};

export default eventsReducer;
