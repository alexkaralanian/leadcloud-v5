import React from "react";
import { connect } from "react-redux";
import OpenHouse from "../../components/OpenHouse/OpenHouse";
import OpenHouseForm from "../../components/OpenHouse/OpenHouseForm";
import { submitNewOpenHouseContact } from "../../actions/contact-actions";

class OpenHouseContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <OpenHouse
          listing={this.props.location.state.listing}
          images={this.props.location.state.images}
        />
        <OpenHouseForm
          onSubmit={values => {
            values["listingId"] = this.props.location.state.listing.id;
            this.props.submitNewOpenHouseContact(values);
          }}
          listing={this.props.location.state.listing}
        />
      </div>
    );
  }
}

const mapsStateToProps = state => ({});

const mapDispatchToProps = {
  submitNewOpenHouseContact
};

export default connect(mapsStateToProps, mapDispatchToProps)(
  OpenHouseContainer
);
