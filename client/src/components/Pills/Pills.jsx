import React from "react";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Pills.css";

const Pills = ({
  component, // group
  hostComponent,
  componentName,
  submitFunction,
  displayValue
}) => {
  return (
    <ul className="pills_list">
      {component &&
        component.map(item => {
          return (
            <li key={item.id}>
              <div className="pills_container">
                <Link key={item.id} to={`/${componentName}/${item.id}`}>
                  <div className="pills_link">{item[displayValue]}</div>
                </Link>
                <div
                  role="button"
                  className="pills_button"
                  onClick={event => {
                    event.stopPropagation();
                    submitFunction(item, hostComponent);
                  }}
                >
                  <span className="pills_link">x</span>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Pills;
