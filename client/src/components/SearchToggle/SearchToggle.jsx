import React from "react";
import { connect } from "react-redux";
import { ButtonGroup, Button } from "react-bootstrap";

const SearchToggle = ({ fetchContacts, fetchGroupContacts, standardMode }) => {
  return (
    <ButtonGroup>
      <Button onClick={() => fetchContacts()}>All Contacts</Button>
      <Button onClick={() => fetchGroupContacts()}>Group Contacts</Button>
    </ButtonGroup>
  );
};

export default SearchToggle;
