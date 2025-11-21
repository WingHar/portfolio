import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open without causing layout shift
  useEffect(() => {
    if (isOpen) {
      // Get the current scroll position
      const scrollY = window.scrollY;
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Apply styles to prevent scroll and layout shift
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Restore the scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.paddingRight = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'Projects and Experiences', href: '/projects' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Engineering', href: '/engineering' },
    { label: 'About', href: '/about' },
    { label: 'Career Timeline', href: '/experience' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-portfolio-primary-dark/95 backdrop-blur-md border-b border-portfolio-secondary/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/64faefab-ebff-4c54-9e53-439da8474a8f.png" 
              alt="VH Logo" 
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-portfolio-primary-light hover:text-portfolio-tertiary transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <span className="text-xs bg-portfolio-tertiary px-2 py-1 rounded text-white">
                    Admin
                  </span>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSignOut}
                  className="bg-portfolio-secondary border-portfolio-secondary text-portfolio-primary hover:bg-portfolio-secondary/80 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  size="sm"
                  className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-portfolio-primary-light hover:text-portfolio-tertiary relative z-[60]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        <div className={`md:hidden fixed inset-0 top-0 left-0 w-full h-full bg-portfolio-primary-dark/98 backdrop-blur-lg z-[55] transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-full invisible'
        }`}>
          <div className="flex flex-col justify-center items-center h-full px-8">
            <div className="space-y-8 text-center">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block text-2xl font-medium text-portfolio-primary-light hover:text-portfolio-tertiary transition-all duration-300 transform ${
                    isOpen 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 100 + 200}ms` : '0ms' 
                  }}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className={`pt-8 space-y-4 transform transition-all duration-300 ${
                isOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ 
                transitionDelay: isOpen ? `${navItems.length * 100 + 200}ms` : '0ms' 
              }}>
                {user ? (
                  <div className="space-y-4">
                    {isAdmin && (
                      <span className="inline-block text-sm bg-portfolio-tertiary px-3 py-1 rounded text-white">
                        Admin
                      </span>
                    )}
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleSignOut}
                      className="bg-portfolio-secondary border-portfolio-secondary text-portfolio-primary hover:bg-portfolio-secondary/80 hover:text-white text-lg px-8 py-3"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={handleLinkClick}>
                    <Button 
                      size="lg"
                      className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold text-lg px-8 py-3"
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
