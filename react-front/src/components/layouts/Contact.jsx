import React from 'react';
import MediaImage from '../MediaImage';
import GravityForm from '../GravityForm';

const Contact = ({ data }) => {
    const { contact_details, contact_number, contact_icon } = data;

    return (
        <section className="contact-section">
            <div className="container">
                <h2>Contact Us</h2>
                <div className="contact-content">

                    <MediaImage
                        id={contact_icon}
                        alt="Contact Icon"
                        className="contact-img"
                    />

                    <h3>{contact_number}</h3>
                    <p>{contact_details}</p>

                    <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '20px' }}>
                        <GravityForm formId="1" />
                    </div>

                    <button className="contact-btn" style={{ marginTop: '20px' }}>
                        Get in Touch
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Contact;
