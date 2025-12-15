import React from 'react';

const About = ({ data }) => {
    // Destructure fields based on JSON structure
    const { about_title, about_subtitle } = data;

    return (
        <section className="about-section">
            <div className="container">
                {about_title && <h2>{about_title}</h2>}
                {about_subtitle && <p>{about_subtitle}</p>}
            </div>
        </section>
    );
};

export default About;
