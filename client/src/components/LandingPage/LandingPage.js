import React from "react";

const LandingPage = ({ isAuthed }) => (
  <div>
    <h1>LOGIN PAGE </h1>
    <a href="/api/authp/google">LOGIN</a>
    {isAuthed ? <h3>LOGGED IN</h3> : <h3>LOGGED OUT</h3>}
  </div>
);

export default LandingPage;
