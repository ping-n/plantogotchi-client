import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/sign-up">Sign Up</Link>
    </nav>
  );
}

export default NavBar;
