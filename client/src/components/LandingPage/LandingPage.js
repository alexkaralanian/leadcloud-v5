import React from "react";

const LandingPage = ({ isAuthed, logout }) => (
  <div>
    <h1>LOGIN PAGE </h1>

    {!isAuthed ? (
      <a href="/api/auth/google">LOGIN</a>
    ) : (
      <button onClick={logout}>LOG OUT</button>
    )}
  </div>
);

export default LandingPage;
