import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, getRelativeUrl } from '../helper/helper';

const Footer = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/react-theme/v1/menus`);
                if (!response.ok) throw new Error('Failed to fetch menu');
                const data = await response.json();
                if (data.footer) {
                    setMenuItems(data.footer);
                }
            } catch (error) {
                console.error('Error fetching footer menu:', error);
            }
        };

        fetchMenu();
    }, []);

    return (
        <footer className="site-footer">
            <div className="container footer-container">
                {menuItems.length > 0 && (
                    <div className="footer-nav">
                        <ul>
                            {menuItems.map((item) => (
                                <li key={item.ID}>
                                    <Link to={getRelativeUrl(item.url)}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="copyright">
                    <p>&copy; {new Date().getFullYear()} My React WP Site. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
