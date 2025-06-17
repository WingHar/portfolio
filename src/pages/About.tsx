
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  TrendingUp, 
  Users, 
  Target, 
  Database, 
  BarChart, 
  Lightbulb,
  Award,
  Building,
  Zap
} from 'lucide-react';

const About = () => {
  const skills = [
    {
      category: 'Product Management',
      icon: Lightbulb,
      items: ['Product Strategy', 'Roadmap Planning', 'User Research', 'Feature Prioritization', 'A/B Testing', 'Analytics'],
      color: 'portfolio-tertiary'
    },
    {
      category: 'Full Stack Engineering',
      icon: Code,
      items: ['React/Next.js', 'Node.js/Express', 'PostgreSQL/MongoDB', 'AWS/GCP', 'TypeScript', 'Python'],
      color: 'portfolio-secondary'
    },
    {
      category: 'Marketing Leadership',
      icon: TrendingUp,
      items: ['Paid Advertising', 'Team Management', 'Campaign Strategy', 'Budget Optimization', 'Performance Marketing', 'Content Management'],
      color: 'portfolio-primary'
    }
  ];

  const achievements = [
    { icon: Building, value: '5+', label: 'Products Launched' },
    { icon: Users, value: '15+', label: 'Team Members Led' },
    { icon: Target, value: '$5M+', label: 'Ad Spend Managed' },
    { icon: Zap, value: '300%', label: 'Average ROI Improvement' }
  ];

  const experience = [
    {
      role: 'Senior Product Manager',
      company: 'TechCorp',
      period: '2022 - Present',
      description: 'Led cross-functional teams to deliver B2B SaaS products, managing roadmaps for 100K+ users while maintaining 99.9% uptime.',
      highlights: ['Launched 3 major features', 'Increased user engagement by 40%', 'Reduced churn by 25%']
    },
    {
      role: 'Marketing Team Lead & Full Stack Developer',
      company: 'GrowthCo',
      period: '2020 - 2022',
      description: 'Dual role managing paid advertising campaigns while building internal tools and analytics dashboards.',
      highlights: ['Managed $2M+ annual ad spend', 'Built custom attribution platform', 'Led team of 8 marketers']
    },
    {
      role: 'Full Stack Engineer',
      company: 'StartupXYZ',
      period: '2018 - 2020',
      description: 'Built scalable web applications from ground up, focusing on user experience and performance optimization.',
      highlights: ['Architected microservices platform', 'Improved page load times by 60%', 'Implemented CI/CD pipelines']
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
              <span className="text-gradient">About Me</span>
            </h1>
            <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto leading-relaxed mb-8">
              A unique blend of product vision, technical expertise, and marketing acumen. I bridge the gap 
              between what users need, what's technically possible, and what drives business growth.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="bg-portfolio-tertiary/20 text-portfolio-tertiary border-portfolio-tertiary/30">
                Product Manager
              </Badge>
              <Badge variant="outline" className="bg-portfolio-secondary/20 text-portfolio-secondary border-portfolio-secondary/30">
                Full Stack Engineer
              </Badge>
              <Badge variant="outline" className="bg-portfolio-primary/20 text-portfolio-primary-light border-portfolio-primary-light/30">
                Marketing Leader
              </Badge>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-portfolio-primary/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-gradient">Core Competencies</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {skills.map((skillGroup, index) => (
                <Card 
                  key={skillGroup.category}
                  className="bg-portfolio-primary-dark border-portfolio-secondary hover:border-portfolio-tertiary/50 transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <skillGroup.icon className={`w-8 h-8 text-${skillGroup.color} mr-4`} />
                      <h3 className="text-2xl font-bold text-white">{skillGroup.category}</h3>
                    </div>
                    <div className="space-y-3">
                      {skillGroup.items.map((skill) => (
                        <div 
                          key={skill}
                          className="bg-portfolio-primary/50 text-portfolio-primary-light px-4 py-3 rounded-lg font-medium border border-portfolio-secondary/30"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-gradient">Key Achievements</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.label}
                  className="text-center"
                >
                  <div className="bg-portfolio-primary-dark border border-portfolio-secondary rounded-lg p-6 hover:border-portfolio-tertiary/50 transition-colors">
                    <achievement.icon className="w-8 h-8 text-portfolio-tertiary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">{achievement.value}</div>
                    <div className="text-portfolio-primary-light text-sm">{achievement.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-portfolio-primary/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-gradient">Professional Journey</span>
            </h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <Card 
                  key={job.role}
                  className="bg-portfolio-primary-dark border-portfolio-secondary hover:border-portfolio-tertiary/50 transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{job.role}</h3>
                        <p className="text-portfolio-tertiary font-semibold">{job.company}</p>
                      </div>
                      <div className="text-portfolio-primary-light font-medium mt-2 md:mt-0">
                        {job.period}
                      </div>
                    </div>
                    <p className="text-portfolio-primary-light mb-4 leading-relaxed">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.highlights.map((highlight) => (
                        <Badge 
                          key={highlight}
                          variant="outline" 
                          className="bg-portfolio-secondary/20 text-portfolio-secondary border-portfolio-secondary/30"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Philosophy */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-gradient">My Approach</span>
            </h2>
            <Card className="bg-portfolio-primary-dark border-portfolio-secondary">
              <CardContent className="p-8">
                <div className="text-lg text-portfolio-primary-light leading-relaxed space-y-6">
                  <p>
                    <strong className="text-portfolio-tertiary">Data-Driven Decision Making:</strong> I believe in letting data guide product decisions, 
                    whether it's user analytics, A/B test results, or campaign performance metrics. Every feature, every campaign, 
                    and every strategy is validated through measurable outcomes.
                  </p>
                  <p>
                    <strong className="text-portfolio-tertiary">Technical Empathy:</strong> My engineering background allows me to work seamlessly 
                    with development teams, understanding technical constraints while advocating for user needs. I can prototype 
                    solutions and contribute to implementation when needed.
                  </p>
                  <p>
                    <strong className="text-portfolio-tertiary">Growth-Focused Leadership:</strong> Having led marketing teams, I understand the 
                    importance of clear communication, setting measurable goals, and creating an environment where team members 
                    can excel while delivering exceptional results.
                  </p>
                  <p>
                    <strong className="text-portfolio-tertiary">User-Centric Innovation:</strong> Whether building products or running campaigns, 
                    I start with understanding user needs and pain points. The best solutions solve real problems in elegant ways 
                    that users love and businesses can scale.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
