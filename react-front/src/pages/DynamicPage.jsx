// src/pages/DynamicPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlockManager from '../components/BlockManager';
import { API_BASE_URL } from '../helper/helper';

const DynamicPage = () => {
  const { slug } = useParams(); // Get the slug from the URL (e.g., "about-us")
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. Determine the API Endpoint
    // If slug is undefined, we are on the homepage ('/'). 
    // You must set your homepage slug in WP (usually 'home') or use your specific homepage slug.
    const slugToFetch = slug || 'home';

    const fetchPage = async () => {
      setLoading(true);
      setError(false);

      try {
        // 2. Fetch data filtering by slug
        const response = await fetch(`${API_BASE_URL}/wp/v2/pages?slug=${slugToFetch}&_embed`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 3. Handle 404 (WordPress returns empty array if no page matches)
        if (Array.isArray(data) && data.length > 0) {
          setPageData(data[0]);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]); // Re-run this effect whenever the URL slug changes

  // --- Render States ---
  if (loading) return <div className="loading">Loading page...</div>;

  if (error) return (
    <div className="error">
      <h1>404 - Page Not Found</h1>
      <p>The page "{slug}" does not exist.</p>
    </div>
  );

  if (!pageData) return null;

  // --- Success Render ---
  return (
    <main className="dynamic-page">
      {/* Optional: Render standard WP Title */}
      {/* <h1>{pageData.title.rendered}</h1> */}

      {/* THE MAGIC: Pass the Flexible Content field to BlockManager */}
      {/* 'flexible' is the field name from your screenshot */}
      <BlockManager sections={(pageData.acf && pageData.acf.flexible) || []} />
      {(!pageData.acf || !pageData.acf.flexible || pageData.acf.flexible.length === 0) && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>No content found</h2>
          <p>Please add content to this page in WordPress.</p>
        </div>
      )}
    </main>
  );
};

export default DynamicPage;