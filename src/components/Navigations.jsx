import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

// Navigation items with paths
const NAV_ITEMS = [
    { key: 'home', path: '/', name: 'Home' },
    { key: 'todo', path: '/todo', name: 'To Do' },
    { key: 'history', path: '/history', name: 'History' },
    { key: 'archive', path: '/archive', name: 'Archive' },
    { key: 'contact', path: '/contact', name: 'Contact Us' },
];

const Navigation = ({ onLinkClick, isMobileView }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (     
        <>   
            { !isMobileView ? (
                <nav aria-label="Main Navigation" >
                    <ul className="nav-list">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.key} className="nav-item">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => (isActive ? 'laptop-nav-link mobile-nav-active' : 'laptop-nav-link')}
                                    onClick={onLinkClick}
                                    end={item.path === '/'}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            ) : (
                <div className="mobile-nav-wrapper">
                    <button 
                        className="menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <Menu />
                    </button>
                    {isMenuOpen && (
                        <div 
                            className="backdrop" 
                            onClick={() => setIsMenuOpen(false)}
                        ></div>
                    )}

                    {/* 2. Side Drawer Component */}
                    <div className={`side-drawer ${isMenuOpen ? 'open' : ''}`}>

                        <nav aria-label="Mobile Navigation">
                            <ul className="mobile-nav-list">
                                {NAV_ITEMS.map((item) => (
                                    <li key={item.key} className="mobile-nav-item">
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) => (isActive ? 'mobile-nav-link mobile-nav-active' : 'mobile-nav-link')}
                                            onClick={() => {
                                                onLinkClick();
                                                setIsMenuOpen(false);
                                            }} 
                                            end={item.path === '/'}
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navigation;