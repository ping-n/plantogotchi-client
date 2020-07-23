import React from "react";
import { Link } from "react-router-dom"

const LoggedOut = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link data-testid="login" to="/login">
        Login
      </Link>
      <Link data-testid="signup" to="/sign-up">
        Sign Up
      </Link>
    </div>
  );
};

export default LoggedOut;
