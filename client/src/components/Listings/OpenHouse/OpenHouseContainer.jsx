import React from "react";
import { connect } from "react-redux";
import OpenHouse from "./OpenHouse";
import OpenHouseForm from "./OpenHouseForm";
import submitNewOpenHouseContact from "../../../actions/open-house-actions";

class OpenHouseContainer extends React.Component {
  render() {
    const { listing, submitNewOpenHouseContact } = this.props;
    return (
      <div>
        <OpenHouse listing={listing} />
        <OpenHouseForm
          onSubmit={values => {
            submitNewOpenHouseContact(values, listing.id);
          }}
          listing={listing}
        />
      </div>
    );
  }
}

const mapsStateToProps = state => ({
  listing: state.listingReducer.listing
});

const mapDispatchToProps = {
  submitNewOpenHouseContact
};

export default connect(mapsStateToProps, mapDispatchToProps)(OpenHouseContainer);
