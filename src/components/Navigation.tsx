
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

  const navItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleSignOut = async () => {
    await signOut();
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
              src="/lovable-uploads/ec2b2fb7-0847-43df-941e-bbf34c3ca753.png" 
              alt="Wing Har Logo" 
              className="h-6 w-auto"
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
              className="text-portfolio-primary-light hover:text-portfolio-tertiary"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-portfolio-primary-dark/95 backdrop-blur-md border-t border-portfolio-secondary/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block px-3 py-2 text-portfolio-primary-light hover:text-portfolio-tertiary transition-colors duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    {isAdmin && (
                      <span className="text-xs bg-portfolio-tertiary px-2 py-1 rounded text-white">
                        Admin
                      </span>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSignOut}
                      className="w-full bg-portfolio-secondary border-portfolio-secondary text-portfolio-primary hover:bg-portfolio-secondary/80 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button 
                      size="sm"
                      className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold w-full"
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
