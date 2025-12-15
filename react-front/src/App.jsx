import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DynamicPage from './pages/DynamicPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById('site-header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ paddingTop: headerHeight }}>
          <Routes>
            {/* Route for the Homepage (root path) */}
            <Route path="/" element={<DynamicPage />} />

            {/* Route for ANY other page (captures the slug) */}
            <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router >
  );
}

export default App;