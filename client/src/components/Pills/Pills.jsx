import React from "react";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Pills.css";

const Pills = ({
  component, // group
  componentName,
  submitFunction,
  displayValue
}) => {
  return (
    <ul className="pills_list">
      {component &&
        component.map(item => (
          <li key={item.id}>
            <div
              role="button"
              className="pills_button"
              onClick={event => {
                event.stopPropagation();
                submitFunction(item);
              }}
            >
              <span className="pills_link">x</span>
            </div>
            <Link key={item.id} to={`/${componentName}/${item.id}`}>
              <div className="pills_link">{item[displayValue]}</div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Pills;
