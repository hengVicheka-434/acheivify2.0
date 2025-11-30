import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ToDo from './pages/ToDo';
import History from './pages/History';
import Archive from './pages/Archive';
import Contact from './pages/Contact';
import Header from './components/Header';
import Navigation from './components/Navigations';
import './styles/App.css';

export const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    return (
        <div id="wrapper">
            <div className='body-wrapper'>
                <div className="top site-header">
                    <Header />
                    <Navigation isMobileView={isMobileView} onLinkClick={() => setIsMenuOpen(false)} />
                </div>

                <div>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/todo" element={<ToDo />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/archive" element={<Archive />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </div>

            <footer>
                <div id="contact" className="footer">
                    <p><br/>Copyright &copy; 2025 Acheivify</p>
                    <a className="email-link" href="mailto:h.h.vicheka@gmail.com">acheivify@gmail.com</a>
                </div>
            </footer>
        </div>
    );
};

export default App;
