
import React from 'react';
import MediaImage from '../MediaImage';

const Blogs = ({ data }) => {
    const blogs = data.blog || [];

    return (
        <section className="blogs-section">
            <div className="container">
                <h2>Latest Blogs</h2>
                <div className="blogs-grid">
                    {blogs.map((item, index) => (
                        <div key={index} className="blog-card">
                            <MediaImage
                                id={item.blog_img}
                                alt={item.blog_title}
                            />
                            <div className="blog-content">
                                <h3>{item.blog_title}</h3>
                                <p>{item.blog_description}</p>
                                <a href="#">Read More &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
