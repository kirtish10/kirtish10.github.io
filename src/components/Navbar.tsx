import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onTerminalToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTerminalToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    // If not on homepage, redirect to home page first, then scroll
    if (pathname !== '/') {
      e.preventDefault();
      navigate(`/${hash}`);
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      e.preventDefault();
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-surface/95 py-2 shadow-2xl border-b border-glass-stroke' 
          : 'bg-surface/80 py-4 border-b border-glass-stroke backdrop-blur-xl'
      }`}
      id="main-nav"
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-gutter py-4 max-w-container-max mx-auto">
        <Link 
          to="/" 
          className="font-headline-md text-headline-md font-bold text-on-surface tracking-tighter"
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          DevPortfolio
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a 
            className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" 
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
          >
            About
          </a>
          <a 
            className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" 
            href="#experience"
            onClick={(e) => handleNavClick(e, '#experience')}
          >
            Experience
          </a>
          <a 
            className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" 
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
          >
            Projects
          </a>
          <a 
            className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" 
            href="#skills"
            onClick={(e) => handleNavClick(e, '#skills')}
          >
            Skills
          </a>
          <a 
            className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span 
            className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-all select-none p-2 hover:bg-surface-variant/40 rounded-full"
            onClick={onTerminalToggle}
            title="Open Console Console (help)"
          >
            terminal
          </span>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold active:scale-95 transition-all hover:shadow-[0_0_15px_rgba(95,139,255,0.4)] interactive-element block text-center"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
