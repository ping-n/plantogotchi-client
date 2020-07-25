import React from "react";
import { Link } from "react-router-dom";

const LoggedOut = () => {
  return (
    <div className="nav">
      <div className="nav-home">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-controls">
        <Link data-testid="login" to="/login">
          Login
        </Link>
        <Link data-testid="signup" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoggedOut;
