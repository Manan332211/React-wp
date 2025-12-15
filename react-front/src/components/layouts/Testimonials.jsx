import React from 'react';
import MediaImage from '../MediaImage';

const Testimonials = ({ data }) => {
    const testimonials = data.testimonial || [];

    return (
        <section className="testimonials-section">
            <div className="container">
                <h2>Testimonials</h2>
                <div className="testimonials-grid">
                    {testimonials.map((item, index) => (
                        <div key={index} className="testimonial-card">
                            <MediaImage
                                id={item.testimonial_img}
                                alt={item.testimonial_name}
                            />
                            <p>"{item.testimonial_description}"</p>
                            <h4>{item.testimonial_name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
