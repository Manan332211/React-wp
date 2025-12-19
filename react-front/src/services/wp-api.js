const API_ROOT = import.meta.env.VITE_WP_API_URL || 'http://localhost/react-wp/wp-backend/wp-json';

// Auth Header Helper
const getAuthHeaders = () => {
    // Try env vars first, fallback to the keys the user had hardcoded
    const key = import.meta.env.VITE_GF_CONSUMER_KEY || 'ck_a1ff639b96476084e2aee605d074bd0519c322a6';
    const secret = import.meta.env.VITE_GF_CONSUMER_SECRET || 'cs_2fc2d4b6ca82e61a5456a599641e2da6f7820e7b';

    const hash = btoa(`${key}:${secret}`);

    return {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${hash}`
    };
};

// --- Existing Function---
export const fetchPosts = async () => {
    try {
        const response = await fetch(`${API_ROOT}/wp/v2/posts?_embed`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

// 1. Form Structure get
export const fetchGravityForm = async (formId) => {
    try {
        // Use custom open endpoint defined in functions.php (bypasses Auth necessity)
        const response = await fetch(`${API_ROOT}/react-theme/v1/form/${formId}`);
        if (!response.ok) throw new Error(`Failed to fetch form: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching GF:", error);
        return null; // Return null so the component knows it failed
    }
};

// 2. Form Submit 
export const submitGravityForm = async (formId, data) => {
    try {
        // Use custom open endpoint
        const response = await fetch(`${API_ROOT}/react-theme/v1/form/${formId}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error submitting form:", error);
        return { is_valid: false };
    }
};