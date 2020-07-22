import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NavBar extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link data-testid="login" to="/login">
          Login
        </Link>
        <Link data-testid="signup" to="/sign-up">
          Sign Up
        </Link>
        <Link data-testid="myaccount" to="/myaccount">
          My Account
        </Link>
        <Link data-testid="plants" to="/plants">
          Plants
        </Link>
        <Link data-testid="createbreed" to="/createbreed">
          Create Breed
        </Link>
        <Link data-testid="createplant" to="/createplant">
          Create Plant
        </Link>
        <Link data-testid="breeds" to="/breeds">
          Breeds
        </Link>
      </nav>
    );
  }
}

export default NavBar;
