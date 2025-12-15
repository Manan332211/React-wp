import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../helper/helper';

const MediaImage = ({ id, alt, className, style, onClick }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Handle if 'id' is actually a full URL string or object already
        if (!id) {
            setLoading(false);
            return;
        }

        if (typeof id === 'string') {
            setImageUrl(id);
            setLoading(false);
            return;
        }

        if (typeof id === 'object' && id.url) {
            setImageUrl(id.url);
            setLoading(false);
            return;
        }

        // 2. If it's a number, fetch the media details
        if (typeof id === 'number') {
            const fetchMedia = async () => {
                try {
                    // Fix: Add /wp/v2 to the path
                    const response = await fetch(`${API_BASE_URL}/wp/v2/media/${id}`);
                    if (!response.ok) throw new Error('Failed to fetch media');
                    const data = await response.json();
                    setImageUrl(data.source_url);
                } catch (error) {
                    console.error(`Error fetching media ID ${id}:`, error);
                    // Fallback placeholder
                    setImageUrl(`https://placehold.co/600x400?text=Error+Loading+Image+${id}`);
                } finally {
                    setLoading(false);
                }
            };

            fetchMedia();
        } else {
            setLoading(false);
        }

    }, [id]);

    if (loading) {
        return <div className={`image-loading ${className}`} style={{ ...style, backgroundColor: '#eee', minHeight: '50px' }}></div>;
    }

    if (!imageUrl) {
        return <img src="https://placehold.co/600x400?text=No+Image" alt={alt || 'No image'} className={className} style={style} />;
    }

    return (
        <img
            src={imageUrl}
            alt={alt || 'WordPress Media'}
            className={className}
            style={style}
            onClick={onClick}
        />
    );
};

export default MediaImage;
