
const API_ROOT = 'http://localhost/react-wp/wp-backend/wp-json';
const key = 'ck_2884857890fa6ad85b317bf5b47f01c45d654ff2';
const secret = 'cs_d656dbc33be92b782a868f6953d7a59a33f8f3fc';

const getAuthHeaders = () => {
    const hash = Buffer.from(`${key}:${secret}`).toString('base64');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${hash}`
    };
};


async function testPublic() {
    console.log("Testing Public API (Posts)...");
    try {
        const response = await fetch(`${API_ROOT}/wp/v2/posts`);
        console.log("Public Status:", response.status);
    } catch (e) {
        console.error("Public Error:", e);
    }
}

async function test() {
    await testPublic();
    console.log("\nTesting GF API (Headers)...");
    try {
        // Try to list forms instead of getting specific one
        const response = await fetch(`${API_ROOT}/gf/v2/forms`, {
            headers: getAuthHeaders()
        });
        console.log("Forms List Status:", response.status);
        console.log("Forms List Body:", await response.text());
    } catch (e) {
        console.error("Headers Error:", e);
    }

    console.log("\nTesting GF API (Query Params)...");
    try {
        const response = await fetch(`${API_ROOT}/gf/v2/forms/1?consumer_key=${key}&consumer_secret=${secret}`);
        console.log("Query Status:", response.status);
        console.log("Query Body:", await response.text());
    } catch (e) {
        console.error("Query Error:", e);
    }
}

test();
