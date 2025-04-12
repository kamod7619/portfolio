import { resumeData } from '@/utils/resumeData';
import { useState, useEffect, useRef } from 'react';

interface ExperienceItemProps {
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  responsibilities?: string[];
  leadership?: string;
  index: number;
}

// Animated item component for each experience
const ExperienceItem = ({ 
  title,
  company,
  duration,
  description,
  technologies,
  responsibilities,
  leadership,
  index
}: ExperienceItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a slight delay based on the index for a staggered reveal effect
          setTimeout(() => {
            setIsVisible(true);
          }, index * 200);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [index]);
  
  return (
    <div 
      ref={itemRef}
      className={`relative mb-12 timeline-item transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Vertical timeline line and dot */}
      <div className="absolute left-0 top-0 bottom-0 ml-4 md:ml-6 hidden md:block">
        <div className="absolute top-7 w-4 h-4 rounded-full bg-primary -left-1"></div>
        <div className="absolute top-9 bottom-0 left-0 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
      
      <div className="md:ml-16 relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <h3 className="text-2xl font-semibold text-foreground">{company}</h3>
          <span className="bg-gradient-to-r from-primary/30 to-blue-500/30 text-primary py-1 px-3 rounded-full text-sm font-medium">
            {duration}
          </span>
        </div>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 font-medium mb-2">{title}</p>
        <p className="text-[#555] dark:text-gray-300 mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-foreground mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, techIndex) => (
              <span 
                key={techIndex} 
                className="bg-gray-200 dark:bg-gray-700 text-[#333] dark:text-gray-200 py-1 px-2 rounded text-sm transition-all duration-300 hover:bg-primary/20 hover:text-primary"
                style={{ transitionDelay: `${techIndex * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {responsibilities && (
          <div className="animate-in-right">
            <h4 className="font-semibold text-foreground mb-2">Key Responsibilities:</h4>
            <ul className="list-disc pl-5 text-[#555] dark:text-gray-300 space-y-1">
              {responsibilities.map((responsibility, respIndex) => (
                <li 
                  key={respIndex} 
                  className="transition-all duration-500"
                  style={{ transitionDelay: `${(respIndex + 1) * 100}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-10px)' }}
                >
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {leadership && (
          <div className="mt-4 transition-all duration-700" style={{ transitionDelay: '500ms', opacity: isVisible ? 1 : 0 }}>
            <h4 className="font-semibold text-foreground mb-2">Leadership:</h4>
            <p className="text-[#555] dark:text-gray-300">{leadership}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-[#f8f9fa] dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#333] dark:text-white mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-[#555] dark:text-gray-300 max-w-2xl mx-auto">
            I've worked with various companies and gained valuable experience over the past.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          {resumeData.experience.map((exp, index) => (
            <ExperienceItem
              key={index}
              title={exp.title}
              company={exp.company}
              duration={exp.duration}
              description={exp.description}
              technologies={exp.technologies}
              responsibilities={exp.responsibilities}
              leadership={exp.leadership}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
