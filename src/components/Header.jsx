import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import acheivifyLogo from '../assets/acheivify.jpg';
import '../styles/Header.css';

// Header Component (uses react-router Link for navigation)
const Header = () => {
    return (
        <header>
            <div className="logo-wrapper">
                <Link to="/" className="logo-link">
                    <img src={acheivifyLogo} alt="Acheivify logo" className="logo-img" />
                </Link>
                <p>
                    <Link to="/" className="logo-text">ACHEIVIFY</Link>
                </p> 
            </div>
        </header>
    );
}

export default Header;