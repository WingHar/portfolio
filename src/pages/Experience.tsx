
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: 'Junior Developer',
      company: 'TechStart Inc.',
      location: 'San Francisco, CA',
      startDate: 'Feb 2019',
      endDate: 'Aug 2019',
      description: 'Started my career as a junior developer, learning the fundamentals of web development and working on small features for client projects.',
      skills: ['JavaScript', 'HTML/CSS', 'React', 'Git'],
      achievements: ['Built first production feature', 'Completed onboarding program', 'Collaborated with senior developers']
    },
    {
      id: 2,
      role: 'Frontend Developer',
      company: 'Digital Solutions Co.',
      location: 'Remote',
      startDate: 'Feb 2019',
      endDate: 'Feb 2020',
      description: 'Focused on frontend development, creating responsive user interfaces and improving user experience across multiple projects.',
      skills: ['React', 'TypeScript', 'Sass', 'Webpack'],
      achievements: ['Improved page load times by 40%', 'Led UI redesign project', 'Mentored new team members']
    },
    {
      id: 3,
      role: 'Full Stack Developer',
      company: 'GrowthTech Ltd.',
      location: 'New York, NY',
      startDate: 'Feb 2020',
      endDate: 'Aug 2021',
      description: 'Expanded to full-stack development, working on both frontend and backend systems while managing database operations.',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'AWS'],
      achievements: ['Built microservices architecture', 'Reduced server costs by 30%', 'Implemented CI/CD pipeline']
    },
    {
      id: 4,
      role: 'Senior Developer',
      company: 'InnovateCorp',
      location: 'Austin, TX',
      startDate: 'Sep 2021',
      endDate: 'Sep 2022',
      description: 'Led development initiatives and mentored junior developers while architecting scalable solutions for enterprise clients.',
      skills: ['Python', 'Docker', 'Kubernetes', 'MongoDB'],
      achievements: ['Led team of 5 developers', 'Delivered 3 major projects', 'Reduced deployment time by 60%']
    },
    {
      id: 5,
      role: 'Lead Developer',
      company: 'ScaleTech Solutions',
      location: 'Seattle, WA',
      startDate: 'Sep 2022',
      endDate: 'May 2024',
      description: 'Spearheaded technical strategy and product development, working closely with stakeholders to deliver high-impact solutions.',
      skills: ['React Native', 'GraphQL', 'Redis', 'Terraform'],
      achievements: ['Launched mobile app with 100K+ users', 'Improved system reliability to 99.9%', 'Built development team from 3 to 12']
    },
    {
      id: 6,
      role: 'Technical Consultant',
      company: 'Freelance',
      location: 'Remote',
      startDate: 'May 2024',
      endDate: 'Aug 2024',
      description: 'Provided technical consulting services to startups and established companies, focusing on architecture and scalability.',
      skills: ['System Architecture', 'Performance Optimization', 'Team Leadership', 'Strategy'],
      achievements: ['Consulted for 5 companies', 'Improved client performance by avg 200%', 'Designed scalable architectures']
    },
    {
      id: 7,
      role: 'Senior Product Manager',
      company: 'TechCorp Industries',
      location: 'San Francisco, CA',
      startDate: 'Aug 2024',
      endDate: 'Present',
      description: 'Currently leading product strategy and cross-functional teams to deliver innovative solutions that drive business growth.',
      skills: ['Product Strategy', 'Data Analytics', 'Team Management', 'Stakeholder Relations'],
      achievements: ['Managing $2M+ product budget', 'Leading team of 15+', 'Launching 3 major features'],
      current: true
    }
  ];

  return (
    <div className="min-h-screen bg-portfolio-primary-dark flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="text-gradient">Professional Journey</span>
            </h1>
            <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto leading-relaxed">
              A timeline of my career growth, from junior developer to product leadership, 
              showcasing the evolution of skills and increasing impact over the years.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-portfolio-tertiary via-portfolio-secondary to-portfolio-primary"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}>
                    {/* Timeline Dot */}
                    <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 ${
                      exp.current ? 'animate-pulse' : ''
                    }`}>
                      <div className={`w-4 h-4 rounded-full border-4 border-portfolio-primary-dark ${
                        exp.current 
                          ? 'bg-portfolio-tertiary shadow-lg shadow-portfolio-tertiary/50' 
                          : 'bg-portfolio-secondary'
                      }`}></div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}>
                      <Card className="bg-portfolio-primary-dark border-portfolio-secondary hover:border-portfolio-tertiary/50 transition-all duration-300 holographic-card">
                        <CardContent className="p-6">
                          {/* Header */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                              {exp.current && (
                                <Badge className="bg-portfolio-tertiary text-portfolio-primary-dark animate-pulse">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <p className="text-portfolio-tertiary font-semibold mb-1">{exp.company}</p>
                            <div className="flex items-center text-sm text-portfolio-primary-light space-x-4">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {exp.startDate} - {exp.endDate}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {exp.location}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-portfolio-primary-light mb-4 leading-relaxed">
                            {exp.description}
                          </p>

                          {/* Skills */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-portfolio-tertiary mb-2">Key Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill) => (
                                <Badge 
                                  key={skill}
                                  variant="outline" 
                                  className="bg-portfolio-secondary/20 text-portfolio-secondary border-portfolio-secondary/30 text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Achievements */}
                          <div>
                            <h4 className="text-sm font-semibold text-portfolio-tertiary mb-2">Key Achievements</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-portfolio-primary-light flex items-start">
                                  <span className="w-1.5 h-1.5 bg-portfolio-tertiary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-portfolio-primary/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-gradient">Career Highlights</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-portfolio-tertiary mb-2">5+ Years</div>
                <div className="text-portfolio-primary-light">Professional Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-portfolio-tertiary mb-2">7</div>
                <div className="text-portfolio-primary-light">Different Roles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-portfolio-tertiary mb-2">20+</div>
                <div className="text-portfolio-primary-light">Technologies Mastered</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Experience;
