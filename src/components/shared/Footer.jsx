import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <footer>
                <Link to="/About">ABOUT</Link>
                <Link to="/Faq">FAQ</Link>
                <a href="https://github.com/ping-n/plantogotchi-client">
                    @2020
                </a>
            </footer>
        )
    }
}

export default Footer
