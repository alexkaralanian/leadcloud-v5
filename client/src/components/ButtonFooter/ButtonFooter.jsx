import React from "react";
import { Glyphicon } from "react-bootstrap";
import { Button } from "reactstrap";

const ButtonFooter = ({
  pristine,
  submitting,
  primaryButtonText,
  secondaryButtonText,
  secondaryFunc,
  component
}) => {
  return (
    <div className="button_footer-container">
      <Button
        className="button-lg"
        type="submit"
        color="primary"
        bsSize="large"
        disabled={pristine || submitting}
      >
        <span>{primaryButtonText}</span>
      </Button>

      {secondaryFunc && (
        <Button
          className="button-lg"
          onClick={() => {
            secondaryFunc(component.id);
          }}
          bsSize="large"
          color="danger"
        >
          <span>{secondaryButtonText}</span>
        </Button>
      )}
    </div>
  );
};

export default ButtonFooter;
