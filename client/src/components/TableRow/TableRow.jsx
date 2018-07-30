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
                      {component && component[rowText]
                        ? component[rowText].charAt(0).toUpperCase()
                        : null}
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
                <Button
                  className="addButton"
                  bsStyle={buttonStyle}
                  onClick={() =>
                    isModal
                      ? submitFunction(component)
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
