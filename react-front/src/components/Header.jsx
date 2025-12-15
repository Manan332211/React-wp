import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, getRelativeUrl } from '../helper/helper';

const Header = () => {

    const [menuItems, setMenuItems] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {

        const fetchMenu = async () => {
            try {
                // Fetch from our custom endpoint
                const response = await fetch(`${API_BASE_URL}/react-theme/v1/menus`);
                if (!response.ok) throw new Error('Failed to fetch menu');
                const data = await response.json();
                if (data.header) {
                    setMenuItems(data.header);
                }
            } catch (error) {
                console.error('Error fetching header menu:', error);
            }
        };

        fetchMenu();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header id="site-header" className="site-header">
            <div className="container header-container">
                <div className="logo">
                    <Link to="/">My React WP Site</Link>
                </div>

                {/* Only show toggle button if there are menu items */}
                {menuItems.length > 0 && (
                    <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
                        <span className="hamburger"></span>
                    </button>
                )}

                {/* Only show nav if there are menu items */}
                {menuItems.length > 0 && (
                    <nav className={`main-navigation ${isMenuOpen ? 'open' : ''}`}>
                        <ul>
                            {menuItems.map((item) => (
                                <li key={item.ID}>
                                    <Link to={getRelativeUrl(item.url)}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
