
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'admin@winghar.com',
      href: 'mailto:admin@winghar.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
        <p className="text-portfolio-primary-light text-lg leading-relaxed mb-8">
          Whether you're looking to build a new application, optimize your marketing campaigns, 
          or discuss strategic partnerships, I'm here to help turn your vision into reality.
        </p>
      </div>

      <div className="space-y-6">
        {contactInfo.map((info) => (
          <Card key={info.label} className="bg-portfolio-primary border-portfolio-secondary hover:border-portfolio-tertiary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-portfolio-tertiary/20 p-3 rounded-lg mr-4">
                  <info.icon className="w-6 h-6 text-portfolio-tertiary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{info.label}</h3>
                  {info.href === '#' ? (
                    <p className="text-portfolio-primary-light">{info.value}</p>
                  ) : (
                    <a 
                      href={info.href}
                      className="text-portfolio-primary-light hover:text-portfolio-tertiary transition-colors"
                    >
                      {info.value}
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-portfolio-primary border-portfolio-secondary">
        <CardContent className="p-6">
          <h3 className="text-white font-semibold mb-3">Response Time</h3>
          <p className="text-portfolio-primary-light">
            I typically respond to all inquiries within 24 hours. For urgent matters, 
            feel free to reach out directly via email.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;
