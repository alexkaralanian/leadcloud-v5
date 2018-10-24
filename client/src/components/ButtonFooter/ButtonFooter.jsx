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
        <div className="button_inner">
          <span className="button_inner-text">{primaryButtonText}</span>
          <Glyphicon glyph="floppy-disk" />
        </div>
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
          <div className="button_inner">
            <span className="button_inner-text">{secondaryButtonText}</span>
            <Glyphicon glyph="trash" />
          </div>
        </Button>
      )}
    </div>
  );
};

export default ButtonFooter;
