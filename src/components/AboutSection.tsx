
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, TrendingUp, Zap, Target, Database, BarChart, Lightbulb } from 'lucide-react';

const skills = [
  {
    category: 'Full Stack Development',
    icon: Code,
    skills: ['React/Next.js', 'Node.js/Express', 'PostgreSQL/MongoDB', 'AWS/GCP', 'TypeScript', 'Python'],
    color: 'portfolio-tertiary'
  },
  {
    category: 'Digital Marketing',
    icon: TrendingUp,
    skills: ['Google/Facebook Ads', 'CTV/OTT Campaigns', 'Programmatic', 'Billboard/OOH', 'Analytics/Attribution', 'A/B Testing'],
    color: 'portfolio-secondary'
  },
  {
    category: 'Product Management',
    icon: Lightbulb,
    skills: ['Product Strategy', 'Roadmap Planning', 'User Research', 'Feature Prioritization', 'A/B Testing', 'Analytics'],
    color: 'portfolio-tertiary'
  }
];

const achievements = [
  { icon: Zap, value: '10M+', label: 'API Requests Handled Daily' },
  { icon: Target, value: '500%', label: 'Average Campaign Growth' },
  { icon: Database, value: '99.9%', label: 'Application Uptime' },
  { icon: BarChart, value: '$2M+', label: 'Ad Spend Managed' }
];

const AboutSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gradient">About Me</span>
          </h2>
          <p className="text-xl text-portfolio-primary-light max-w-4xl mx-auto leading-relaxed">
            I bridge the gap between technical excellence and marketing strategy, creating full-stack solutions 
            while driving measurable growth through data-driven campaigns across all digital and traditional channels.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mb-16">
          {/* First row - Full Stack Development and Digital Marketing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {skills.slice(0, 2).map((skillGroup, index) => (
              <Card 
                key={skillGroup.category}
                className="bg-portfolio-primary-dark border-portfolio-secondary project-card-hover"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <skillGroup.icon className={`w-8 h-8 text-portfolio-${skillGroup.color} mr-4`} />
                    <h3 className="text-2xl font-bold text-white">{skillGroup.category}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {skillGroup.skills.map((skill) => (
                      <div 
                        key={skill}
                        className="bg-portfolio-primary/50 text-portfolio-primary-light px-4 py-3 rounded-lg text-center font-medium border border-portfolio-secondary/30 hover:border-portfolio-tertiary/50 transition-colors"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Second row - Product Management (centered and wider) */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl lg:max-w-3xl">
              <Card 
                className="bg-portfolio-primary-dark border-portfolio-secondary project-card-hover"
                style={{ animationDelay: '0.6s' }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Lightbulb className="w-8 h-8 text-portfolio-tertiary mr-4" />
                    <h3 className="text-2xl font-bold text-white">Product Management</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {skills[2].skills.map((skill) => (
                      <div 
                        key={skill}
                        className="bg-portfolio-primary/50 text-portfolio-primary-light px-4 py-3 rounded-lg text-center font-medium border border-portfolio-secondary/30 hover:border-portfolio-tertiary/50 transition-colors"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.label}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-portfolio-primary-dark border border-portfolio-secondary rounded-lg p-6 hover:border-portfolio-tertiary/50 transition-colors">
                <achievement.icon className="w-8 h-8 text-portfolio-tertiary mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{achievement.value}</div>
                <div className="text-portfolio-primary-light text-sm">{achievement.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Personal Touch */}
        <div className="mt-16 text-center bg-portfolio-primary-dark rounded-2xl p-8 border border-portfolio-secondary">
          <p className="text-lg text-portfolio-primary-light max-w-4xl mx-auto leading-relaxed">
            When I'm not building applications or optimizing campaigns, you'll find me analyzing the latest 
            marketing tech, contributing to open-source projects, or exploring how emerging technologies 
            can reshape digital advertising landscapes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
