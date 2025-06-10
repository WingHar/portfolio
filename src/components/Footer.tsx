
import React from 'react';
import { Button } from '@/components/ui/button';
import { Film, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-portfolio-primary-dark border-t border-portfolio-secondary/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Film className="w-8 h-8 text-portfolio-tertiary mr-3" />
              <span className="text-2xl font-bold text-white">Portfolio</span>
            </div>
            <p className="text-portfolio-primary-light mb-6 leading-relaxed">
              Full Stack Engineer & Digital Marketing Expert creating innovative solutions 
              that bridge technology and strategic growth.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Projects', 'About', 'Experience', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-portfolio-primary-light hover:text-portfolio-tertiary transition-colors duration-200 flex items-center"
                  >
                    {link}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Let's Work Together</h3>
            <p className="text-portfolio-primary-light mb-6">
              Ready to build something amazing? Let's discuss your next project.
            </p>
            <Button 
              size="lg"
              className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold w-full lg:w-auto"
            >
              Start a Conversation
            </Button>
          </div>
        </div>

        <div className="border-t border-portfolio-secondary/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <p className="text-portfolio-primary-light text-sm">
              © 2024 Portfolio. Crafted with passion and precision.
            </p>
            <p className="text-portfolio-primary-light text-sm mt-4 lg:mt-0">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
