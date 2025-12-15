const API_ROOT = import.meta.env.VITE_WP_API_URL || 'http://localhost/react-wp/wp-backend/wp-json';

// Auth Header Helper
const getAuthHeaders = () => {
    const key = import.meta.env.VITE_GF_CONSUMER_KEY;
    const secret = import.meta.env.VITE_GF_CONSUMER_SECRET;
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

// --- NEW: Gravity Forms Functions ---

// 1. Form Structure get
export const fetchGravityForm = async (formId) => {
    try {
        const response = await fetch(`${API_ROOT}/gf/v2/forms/${formId}`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch form');
        return await response.json();
    } catch (error) {
        console.error("Error fetching GF:", error);
        return null;
    }
};

// 2. Form Submit 
export const submitGravityForm = async (formId, data) => {
    try {
        const response = await fetch(`${API_ROOT}/gf/v2/forms/${formId}/submissions`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error submitting form:", error);
        return { is_valid: false };
    }
};