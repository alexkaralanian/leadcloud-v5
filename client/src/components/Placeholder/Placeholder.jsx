import React from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";

const Placeholder = ({ headerText, ctaFunc, ctaText }) => (
  <Row className="margin-top-2">
    <Col xs="12">
      <Card>
        <CardBody>
          <div className="flex-container-column">
            <h3 className="mb-4">{headerText}</h3>
            <Button onClick={ctaFunc} color="primary">
              {ctaText}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default Placeholder;
