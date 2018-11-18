import axios from "axios";
import swal from "sweetalert";

import { push } from "react-router-redux";
import { setListingContacts } from "./listing-contacts-actions";
import { setCount } from "./query-actions";
import { setError, clearFormData } from "./common-actions";

// CREATE NEW OPEN HOUSE CONTACT
const submitNewOpenHouseContact = (values, listingId) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/listings/${listingId}/open-house`,
      values
    );
    dispatch(setListingContacts(res.data.rows));
    dispatch(setCount(res.data.count));
    dispatch(push(`/listings/${listingId}/contacts`));

    swal(
      `Hi, ${res.data.rows[0].firstName}!`,
      "Thanks for signing in!",
      "success"
    );

    dispatch(clearFormData());

    console.log("SUCCESSFULLY SUBMITTED", res.data);
  } catch (err) {
    console.error("Submitting new contact unsuccessful", err);
    dispatch(setError("ERROR SUBMITTING NEW CONTACT"));
  }
};

export default submitNewOpenHouseContact;
