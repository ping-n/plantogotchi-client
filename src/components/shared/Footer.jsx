import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-controls">
          <Link to="/About">ABOUT</Link>
          <Link to="/Faq">FAQ</Link>
        </div>
        <div className="footer-cr">
          <a
            href="https://github.com/ping-n/plantogotchi-client"
            target="_blank"
            rel="noopener noreferrer"
          >
            @2020
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
