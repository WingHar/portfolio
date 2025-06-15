
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceCardProps {
  experience: {
    id: number;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string[];
    achievements: string[];
    current?: boolean;
  };
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  return (
    <div className={`relative flex items-center ${
      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
    } flex-col md:flex-row`}>
      {/* Timeline Dot */}
      <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 ${
        experience.current ? 'animate-pulse' : ''
      }`}>
        <div className={`w-4 h-4 rounded-full border-4 border-portfolio-primary-dark ${
          experience.current 
            ? 'bg-portfolio-tertiary shadow-lg shadow-portfolio-tertiary/50' 
            : 'bg-portfolio-secondary'
        }`}></div>
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
        index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
      }`}>
        <Card className="bg-portfolio-primary-dark border-portfolio-secondary hover:border-portfolio-tertiary/50 transition-all duration-300 holographic-card-reverse">
          <CardContent className="p-6">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{experience.role}</h3>
                {experience.current && (
                  <Badge className="bg-portfolio-tertiary text-portfolio-primary-dark animate-pulse">
                    Current
                  </Badge>
                )}
              </div>
              <p className="text-portfolio-tertiary font-semibold mb-1">{experience.company}</p>
              <div className="flex items-center text-sm text-portfolio-primary-light space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {experience.startDate} - {experience.endDate}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {experience.location}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-portfolio-primary-light mb-4 leading-relaxed">
              {experience.description}
            </p>

            {/* Skills */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-portfolio-tertiary mb-2">Key Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
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
                {experience.achievements.map((achievement, i) => (
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
  );
};

export default ExperienceCard;
