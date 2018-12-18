import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const FooterNav = () => (
  <div className="button_footer-container">
    <ButtonGroup>
      <Button
        type="submit"
        color="primary"
        // disabled={!campaign.title && (pristine || submitting)}
      >
        <span>Next</span>
      </Button>
    </ButtonGroup>
  </div>
);

export default FooterNav;
