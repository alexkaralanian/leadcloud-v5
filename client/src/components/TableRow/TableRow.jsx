import React from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const TableRow = ({
  componentName,
  collection,
  submitFunction,
  hostComponent,
  buttonText,
  buttonStyle,
  rowText,
  isModal
}) => {
  return (
    <Table striped>
      <tbody>
        {collection &&
          collection.map(component => (
            <tr key={component.id}>
              <td>
                {component && component.images ? (
                  <div className="table_img">
                    <img src={component.images[0]} alt="contact" />
                  </div>
                ) : (
                  <div className="table_img-null">
                    <span>
                      {component &&
                        component[rowText] &&
                        component[rowText].charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </td>

              <td>
                <Link to={`/${componentName}/${component.id}`}>
                  <span>{component[rowText]}</span>
                </Link>
              </td>
              <td>
                {/* component represents the pills on state in modal view */}
                <Button
                  className="addButton"
                  disabled={component.disabled}
                  bsStyle={buttonStyle}
                  onClick={() =>
                    isModal
                      ? submitFunction(component, hostComponent.id)
                      : submitFunction(component.id, hostComponent.id)
                  }
                >
                  <span>{buttonText}</span>
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableRow;
