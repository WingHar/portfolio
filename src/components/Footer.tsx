import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { label: 'Experience', href: '/experience', isExternal: false },
    { label: 'Case Studies', href: '/case-studies', isExternal: false },
    { label: 'About', href: '/about', isExternal: false },
    { label: 'Career Timeline', href: '/career-timeline', isExternal: false },
    { label: 'Contact', href: '/contact', isExternal: false }
  ];

  const handleResumeDownload = () => {
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Path to your PDF file in the public folder
    link.download = 'Wing_Har_Resume.pdf'; // Name for the downloaded file
    link.click();
  };

  return (
    <footer className="bg-portfolio-primary-dark border-t border-portfolio-secondary/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/64faefab-ebff-4c54-9e53-439da8474a8f.png" 
                alt="VH Logo" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-portfolio-primary-light mb-6 leading-relaxed body-font">
              Product Manager who combines Engineering and Marketing to create innovative solutions 
              that bridge technological and strategic growth.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-portfolio-secondary border-portfolio-secondary hover:bg-portfolio-secondary/80"
                style={{ color: '#ddc015' }}
                asChild
              >
                <a href="https://github.com/winghar" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" style={{ color: '#ddc015' }} />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-portfolio-secondary border-portfolio-secondary hover:bg-portfolio-secondary/80"
                style={{ color: '#ddc015' }}
                asChild
              >
                <a href="https://www.linkedin.com/in/winghar/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" style={{ color: '#ddc015' }} />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-portfolio-secondary border-portfolio-secondary hover:bg-portfolio-secondary/80"
                style={{ color: '#ddc015' }}
                onClick={handleResumeDownload}
              >
                <span className="body-font" style={{ color: '#ddc015' }}>Download Resume</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6 title-font">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-portfolio-primary-light hover:text-portfolio-tertiary transition-colors duration-200 flex items-center body-font"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6 title-font">Let's Work Together</h3>
            <p className="text-portfolio-primary-light mb-6 body-font">
              Ready to build something amazing? Let's discuss your next project.
            </p>
            <Button 
              size="lg"
              className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold w-full lg:w-auto body-font"
              asChild
            >
              <Link to="/contact">
                Start a Conversation
              </Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-portfolio-secondary/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <p className="text-portfolio-primary-light text-sm body-font">
              © 2025 Wing Har. Developed and inspired by my love for films, design, and coding
            </p>
            <p className="text-portfolio-primary-light text-sm mt-4 lg:mt-0 body-font">
              Built with React (TSX) & Tailwind (CSS). Designed in Figma.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
