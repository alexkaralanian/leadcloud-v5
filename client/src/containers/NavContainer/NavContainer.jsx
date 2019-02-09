// import React from "react";
// import { connect } from "react-redux";
// import { push } from "react-router-redux";
// import PropTypes from "prop-types";
// import Nav from "../../components/Navigation/Nav";
// import { logout } from "../../actions/auth-actions";

// class NavContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleLogout = this.handleLogout.bind(this);
//   }

//   handleLogout() {
//     this.props.logout();
//     this.props.push("/");
//   }

//   render() {
//     return (
//       <Nav
//         logout={this.handleLogout}
//         user={this.props.user}
//         isAuthed={this.props.isAuthed}
//         push={this.props.push}
//       />
//     );
//   }
// }

// const mapStateToProps = state => ({
//   user: state.authReducer.user,
//   isAuthed: state.authReducer.isAuthed
// });

// NavContainer.propTypes = {
//   logout: PropTypes.func.isRequired,
//   isAuthed: PropTypes.bool.isRequired
// };

// export default connect(mapStateToProps, { logout, push })(NavContainer);
