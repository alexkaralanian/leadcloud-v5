import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Card, CardTitle, CardBody, Table } from "reactstrap";

const TableRow = ({
  SearchForm,
  CardHeaderCta,
  cardHeaderText,
  componentName,
  collection,
  submitFunction,
  hostComponent,
  buttonText,
  buttonStyle,
  rowText,
  isModal,
  icon
}) => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <CardTitle className="mb-0">
                <i className={`${icon} mr-2`} />
                <span>{cardHeaderText}</span>
                <div className="card-header-cta mb-4">{CardHeaderCta}</div>
              </CardTitle>
              <div>{SearchForm}</div>
              {collection.length > 0 && (
                <Table responsive striped>
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
                              disabled={component.disabled}
                              color={buttonStyle}
                              onClick={() =>
                                hostComponent
                                  ? submitFunction(component, hostComponent)
                                  : submitFunction(component)
                              }
                            >
                              <span>{buttonText}</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TableRow;