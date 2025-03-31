import { useState, useEffect, useRef } from "react";
import { resumeData } from "@/utils/resumeData";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  category: string;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  imageUrl,
  projectUrl,
  index,
}: ProjectCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a delay based on the index for a staggered effect
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`project-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
        isVisible ? "animate-fadeInUp opacity-100" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-48 overflow-hidden group">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <i className="fas fa-laptop-code text-4xl text-gray-400 dark:text-gray-500"></i>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium"
          >
            Visit Website
          </a>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#333] dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-[#555] dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-gray-700 text-[#333] dark:text-gray-200 py-1 px-2 rounded text-xs transition-transform duration-300 hover:scale-105"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-medium py-2 px-4 rounded-lg transition-all hover:shadow-lg hover:-translate-y-1"
        >
          View Project
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "E-commerce", "Corporate", "App"];

  const filteredProjects =
    activeFilter === "All"
      ? resumeData.projects
      : resumeData.projects.filter(
          (project) => project.category === activeFilter
        );

  return (
    <section id="projects" className="py-20 bg-[#f8f9fa] dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#333] dark:text-white mb-4">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-[#555] dark:text-gray-300 max-w-2xl mx-auto">
            Check out some of the projects I've worked on throughout my career
          </p>
        </div>

        {/* <div className="mb-12">
          <ul className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category, index) => (
              <li key={index}>
                <button 
                  className={`py-2 px-4 rounded-lg transition-colors shadow ${
                    activeFilter === category 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white dark:bg-gray-800 text-[#333] dark:text-white hover:bg-primary hover:text-white'
                  }`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              imageUrl={project.imageUrl}
              projectUrl={project.projectUrl}
              category={project.category}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/kamod7619"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
