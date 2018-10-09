import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "react-router-redux";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./BreadCrumbs.css";

class BreadCrumbs extends React.Component {
  render() {
    const location = this.props.path.slice(1).split("/");

    const capitalize = word =>
      word
        .trim()
        .charAt(0)
        .toUpperCase() + word.slice(1).toLowerCase();

    return (
        <div className="row">
          <div className="col-sm">
            <Breadcrumb>
              <BreadcrumbItem onClick={() => this.props.push(`/dashboard`)}>
                Dashboard
              </BreadcrumbItem>
              {location &&
                location.map(path => {
                  const url = location
                    .slice(0, location.indexOf(path) + 1)

                  return (
                    <BreadcrumbItem onClick={() => this.props.push(`/${url}`)}>
                      {capitalize(path)}
                    </BreadcrumbItem>
                  );
                })}
            </Breadcrumb>
          </div>
        </div>

    );
  }
}

const mapStateToProps = state => ({
  path: state.router.location.pathname
});

export default connect(mapStateToProps, { push })(BreadCrumbs);
