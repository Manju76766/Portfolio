import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './components/Services';
import Contact from './pages/Contact';
import { NotFoundPage as NotFound } from "@/components/ui/404-page-not-found";
import Preloader from './components/Preloader';
import { AnimatePresence } from 'framer-motion';
import './mobile.css';

// Scroll to top + kill GSAP pins on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}


function App() {
  const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem('preloaderDone'));

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('preloaderDone', 'true');
  };

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
