
import React from 'react';
import ExperienceCard from './ExperienceCard';

const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer Intern',
    company: 'Hollywood Insider',
    location: 'New York, NY',
    startDate: 'Feb 2019',
    endDate: 'Aug 2019',
    description: 'Fully developed the Hollywood Insider website and subsidiary websites, including front-end and back-end, in collaboration with Product and Design teams and other developers.',
    skills: ['JavaScript', 'HTML/CSS', 'React', 'Git', 'Kibana', 'GA4', 'GTM'],
    achievements: ['Helped build HollywoodInsider.com from the ground-up', 'Help created partner websites for Hollywood Insider', 'Managed and resolved potential security breach incidents through application of best practices such as with input sanitation']
  },
  {
    id: 2,
    role: 'Product Marketing Manager',
    company: 'Product Gym',
    location: 'New York, NY',
    startDate: 'Feb 2019',
    endDate: 'Feb 2020',
    description: 'Drove Product Gym\'s digital marketing and engagement through research activities, including market and competitive analysis, ideation, presentation of new marketing strategies to co-founders and stakeholders, and market progress measurement.',
    skills: ['Salesforce', 'GA4', 'Hotjar', 'Miro', 'Jira', 'Trello', 'HubSpot', 'Figma'],
    achievements: ['Boosted audience retention and engagement by 60% through automations', 'Analyzed optimal times of each day through A/B testing and began marketing advertisements to increase audience clickthrough rate from 40% to 65%', 'Created marketing funnel flow to lead towards sales, optimizing the people we target']
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

const ExperienceTimeline = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-portfolio-tertiary via-portfolio-secondary to-portfolio-primary"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
