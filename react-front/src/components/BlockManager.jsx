import React from 'react';

import HeroBanner from './layouts/HeroBanner';
import About from './layouts/About';
import Services from './layouts/Services';
import Blogs from './layouts/Blogs';
import Testimonials from './layouts/Testimonials';
import Contact from './layouts/Contact';

// 1. Map ACF layout names (from your screenshot) to React Components
const LAYOUT_MAP = {
    'hero_banner': HeroBanner,  // 'hero_banner' matches the name in your 1st screenshot
    'about': About,
    'services': Services,
    'blogs': Blogs,
    'testimonials': Testimonials,
    'contact': Contact
};

const BlockManager = ({ sections }) => {
    if (!sections || !Array.isArray(sections)) return null;

    return (
        <>
            {sections.map((section, index) => {
                // 2. Find the component that matches the layout name
                const Component = LAYOUT_MAP[section.acf_fc_layout];

                if (Component) {
                    // 3. Pass all field data to that component
                    return <Component key={index} data={section} />;
                }

                console.warn(`Layout "${section.acf_fc_layout}" not found in React.`);
                return null;
            })}
        </>
    );
};

export default BlockManager;