import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import Listings from "../../components/Listings/Listings";
import Navigation from "../NavContainer/NavContainer";
import {
  setIsListingNew,
  fetchListings,
  clearListings,
  clearError
} from "../../actions/listing-actions";

class ListingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createNewListing = this.createNewListing.bind(this);
  }

  componentDidMount() {
    const { fetchListings } = this.props;

    fetchListings();
  }

  componentWillUnmount() {
    const { clearListings, clearError } = this.props;

    clearListings();
    clearError();
  }

  createNewListing() {
    const { history } = this.props;

    history.push("/listing/new");
  }

  render() {
    const { isAuthed, isFetching, listings } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Navigation />
        <Grid>
          <Row id="create-new-listing-btn">
            <Col xs={12}>
              <div>
                <Button
                  bsStyle="primary"
                  onClick={this.createNewListing}
                  className="submitButton"
                >
                  <span>Create New</span>
                </Button>
              </div>
            </Col>
          </Row>
          <div>
            <Listings isFetching={isFetching} listings={listings} />
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  listings: state.listingReducer.listings,
  isFetching: state.listingReducer.isFetching,
  error: state.listingReducer.error
});

const mapDispatchToProps = {
  clearError,
  setIsListingNew,
  fetchListings,
  clearListings
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingsContainer);
