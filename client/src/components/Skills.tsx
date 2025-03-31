import { Progress } from "@/components/ui/progress";
import { resumeData } from "@/utils/resumeData";
import { useEffect, useState, useRef } from "react";

interface SkillProgressProps {
  skill: string;
  percentage: number;
  delay?: number;
}

// Create a component that animates skills in
const FadeInSkill = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div 
      ref={elementRef}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SkillProgress = ({ skill, percentage, delay = 0 }: SkillProgressProps) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  useEffect(() => {
    if (isVisible) {
      setValue(0);
      const timeout = setTimeout(() => {
        setValue(percentage);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, percentage]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-[#333] dark:text-white">{skill}</span>
        <span className={`text-sm font-medium text-primary transition-opacity duration-700 ${value > 0 ? 'opacity-100' : 'opacity-0'}`}>
          {percentage}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

const SkillBadge = ({ skill, index = 0 }: { skill: string; index?: number }) => {
  return (
    <FadeInSkill delay={index * 50}>
      <span className="skill-badge bg-gradient-to-r from-primary to-blue-600 text-white py-2 px-4 rounded-full inline-block transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {skill}
      </span>
    </FadeInSkill>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-[#f8f9fa] dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#333] dark:text-white mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-[#555] dark:text-gray-300 max-w-2xl mx-auto">
            I've worked with a variety of technologies and frameworks across the full stack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">Primary Languages & Frameworks</h3>
            
            {resumeData.skills.primaryLanguages.map((skill, index) => (
              <SkillProgress 
                key={index} 
                skill={skill.name} 
                percentage={skill.percentage} 
              />
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">Backend Technologies</h3>
            
            {resumeData.skills.backend.map((skill, index) => (
              <SkillProgress 
                key={index} 
                skill={skill.name} 
                percentage={skill.percentage} 
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">Frontend Technologies</h3>
            
            {resumeData.skills.frontend.map((skill, index) => (
              <SkillProgress 
                key={index} 
                skill={skill.name} 
                percentage={skill.percentage} 
              />
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">Tools & Stack</h3>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {resumeData.skills.tools.map((tool, index) => (
                <SkillBadge key={index} skill={tool} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">Server & Domain</h3>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.serverAndDomain.map((item, index) => (
                <SkillBadge key={index} skill={item} index={index} />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">Version Control</h3>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.versionControl.map((item, index) => (
                <SkillBadge key={index} skill={item} index={index} />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">Project Management</h3>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.projectManagement.map((item, index) => (
                <SkillBadge key={index} skill={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6 text-center">3rd Party Integrations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h4 className="text-xl font-semibold text-[#333] dark:text-white mb-4">Payments</h4>
              <div className="flex flex-wrap gap-3">
                {resumeData.skills.thirdPartyIntegrations.payments.map((item, index) => (
                  <SkillBadge key={index} skill={item} index={index} />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h4 className="text-xl font-semibold text-[#333] dark:text-white mb-4">Logistics</h4>
              <div className="flex flex-wrap gap-3">
                {resumeData.skills.thirdPartyIntegrations.logistics.map((item, index) => (
                  <SkillBadge key={index} skill={item} index={index} />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h4 className="text-xl font-semibold text-[#333] dark:text-white mb-4">Other</h4>
              <div className="flex flex-wrap gap-3">
                {resumeData.skills.thirdPartyIntegrations.other.map((item, index) => (
                  <SkillBadge key={index} skill={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
