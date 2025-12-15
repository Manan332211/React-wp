import React from 'react';
import MediaImage from '../MediaImage';

const HeroBanner = ({ data }) => {
    const { main_title, sub_title, banner } = data;

    return (
        <section className="hero-banner">
            <div className="hero-background">
                {banner && (
                    <MediaImage
                        id={banner}
                        alt={main_title}
                    />
                )}
                {/* Fallback overlay color if image fails or while loading, but css will handle it */}
                <div className="overlay-gradient"></div>
            </div>

            <div className="container hero-content">
                {main_title && <h1>{main_title}</h1>}
                {sub_title && <p>{sub_title}</p>}
            </div>
        </section>
    );
};

export default HeroBanner;