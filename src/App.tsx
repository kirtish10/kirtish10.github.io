import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InteractiveBackground from './components/InteractiveBackground';
import TerminalOverlay from './components/TerminalOverlay';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import useSmoothScroll from './hooks/useSmoothScroll';

// Helper component to restore scroll positions to the top on page routing
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Inner App component to handle location checks for initial dynamic anchor scrolling
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // If arriving at a hashed path (e.g. from redirect), scroll to that element
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [location]);

  return null;
}

export function App() {
  useSmoothScroll();
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Bind a keyboard shortcut (e.g. Backtick ` or Ctrl+` or Alt+T) to toggle the Terminal Console!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppContent />
      
      {/* Global Interactive Aesthetics */}
      <InteractiveBackground />
      
      {/* Navbar with terminal trigger */}
      <Navbar onTerminalToggle={() => setTerminalOpen(true)} />
      
      {/* Terminal Command Console Overlay */}
      <TerminalOverlay 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
      />

      {/* Main Pages content container */}
      <main className="relative z-10 w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Shared Site Footer with System Telemetry */}
      <Footer />
    </Router>
  );
}

export default App;
