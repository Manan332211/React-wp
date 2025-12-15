import React from 'react';
import MediaImage from '../MediaImage';

const Services = ({ data }) => {
    const services = data.service || [];

    return (
        <section className="services-section">
            <div className="container">
                <h2>Our Services</h2>
                <div className="services-grid">
                    {services.map((item, index) => (
                        <div key={index} className="service-card">
                            <MediaImage
                                id={item.icon}
                                alt={item.title}
                            />
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
