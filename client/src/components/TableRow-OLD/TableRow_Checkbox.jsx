import React from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const TableRowCheckbox = ({
  componentName,
  collection,
  submitFunction,
  hostComponent,
  contact,
  listing,
  buttonText,
  buttonStyle,
  rowText
}) => {
  console.log("component", contact);
  return (
    <Table striped>
      <tbody>
        {collection &&
          collection.map(component => (
            <tr key={component.id}>
              <td>
                {component && component.images ? (
                  <div className="tableImg">
                    <img src={component.images[0]} alt="contact" />
                  </div>
                ) : (
                  <div className="tableImgNull">
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
                  onClick={() => submitFunction(component)}
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

export default TableRowCheckbox;
