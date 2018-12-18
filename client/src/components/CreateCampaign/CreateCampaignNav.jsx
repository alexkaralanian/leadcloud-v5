import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const CreateCampaignNav = ({ push, campaign }) => (
  <div>
    <Nav>
      <NavItem>
        <NavLink onClick={() => push(`/campaigns/${campaign.id}`)}>
          Initialize
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink onClick={() => push(`/campaigns/${campaign.id}/edit`)}>
          Edit
        </NavLink>
      </NavItem>

      {/*<NavItem>
        <NavLink onClick={() => push(`/campaigns/${campaign.id}/review`)}>
          Edit
        </NavLink>
      </NavItem>*/}
    </Nav>
  </div>
);

export default CreateCampaignNav;
