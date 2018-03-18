import React from "react";

const LandingPage = ({ isAuthed, logout }) => (
  <div>
    <h1>LOGIN PAGE </h1>

    {!isAuthed ? (
      <a href="/api/authp/google">LOGIN</a>
    ) : (
      <button onClick={logout}>LOG OUT</button>
    )}
  </div>
);

export default LandingPage;
