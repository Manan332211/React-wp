export const API_BASE_URL = 'http://localhost/react-wp/wp-backend/wp-json';

export const getRelativeUrl = (url) => {
    if (!url) return '/';
    try {
        const urlObj = new URL(url);
        return urlObj.pathname.replace('/react-wp/wp-backend', '') || '/'; // Adjust based on your WP path
    } catch (e) {
        return url;
    }
};

export const resolveImage = (image) => {
    if (!image) return 'https://placehold.co/600x400?text=No+Image';
    if (typeof image === 'number') return `https://placehold.co/600x400?text=Image+ID:+${image}`;
    if (typeof image === 'string') return image;
    if (image.url) return image.url;
    return 'https://placehold.co/600x400?text=Invalid+Image';
};