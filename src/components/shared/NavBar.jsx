import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NavBar extends Component {
  render() {
    return (
      <nav>
        <Link to="/Home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/sign-up">Sign Up</Link>
      </nav>
    )
  }
}

export default NavBar


