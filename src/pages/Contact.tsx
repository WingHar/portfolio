
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) throw error;

      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly at admin@winghar.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-portfolio-primary-dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">Get In Touch</span>
          </h1>
          <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto animate-fade-in">
            Ready to discuss your next project? I'd love to hear from you and explore how we can bring your ideas to life.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-portfolio-primary border-portfolio-secondary">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-portfolio-tertiary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-portfolio-primary-light mb-6">
                      Your message has been sent successfully. I'll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-portfolio-primary-light">Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  className="bg-portfolio-primary-dark border-portfolio-secondary text-white placeholder:text-portfolio-primary-light focus:border-portfolio-tertiary"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-portfolio-primary-light">Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your.email@example.com"
                                  className="bg-portfolio-primary-dark border-portfolio-secondary text-white placeholder:text-portfolio-primary-light focus:border-portfolio-tertiary"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-portfolio-primary-light">Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What's this about?"
                                className="bg-portfolio-primary-dark border-portfolio-secondary text-white placeholder:text-portfolio-primary-light focus:border-portfolio-tertiary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-portfolio-primary-light">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell me about your project or inquiry..."
                                className="bg-portfolio-primary-dark border-portfolio-secondary text-white placeholder:text-portfolio-primary-light focus:border-portfolio-tertiary min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold py-3"
                      >
                        {isSubmitting ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
