import { resumeData } from "@/utils/resumeData";

const TimelineItem = ({
  title,
  institution,
  location,
  year,
}: {
  title: string;
  institution: string;
  location?: string;
  year: string;
}) => {
  return (
    <li className="timeline-item">
      <h4 className="text-xl font-semibold text-[#333] dark:text-white">
        {title}
      </h4>
      <p className="text-primary font-medium">{institution}</p>
      {location && <p className="text-[#555] dark:text-gray-300">{location}</p>}
      <p className="text-[#555] dark:text-gray-300">{year}</p>
    </li>
  );
};

const PersonalInfo = () => {
  const infoItems = [
    { icon: "fas fa-user", label: "Name", value: resumeData.name },
    { icon: "fas fa-calendar", label: "Date of Birth", value: resumeData.dob },
    {
      icon: "fas fa-map-marker-alt",
      label: "Location",
      value: resumeData.location,
    },
    { icon: "fas fa-phone", label: "Phone", value: resumeData.phone },
    { icon: "fas fa-envelope", label: "Email", value: resumeData.email },
    {
      icon: "fas fa-language",
      label: "Languages",
      value: resumeData.languages,
    },
  ];

  return (
    <div className="md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-4">
        Personal Info
      </h3>
      <ul className="space-y-4">
        {infoItems.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-3">
              <i className={item.icon}></i>
            </span>
            <div>
              <strong className="block text-[#333] dark:text-white">
                {item.label}:
              </strong>
              <span className="text-[#555] dark:text-gray-300">
                {item.value}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Education = () => {
  return (
    <div className="md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-4">
        Education
      </h3>
      <ul className="space-y-6">
        {resumeData.education.map((edu, index) => (
          <TimelineItem
            key={index}
            title={edu.degree}
            institution={edu.institution}
            location={edu.location}
            year={edu.year}
          />
        ))}
      </ul>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#f8f9fa] dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#333] dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-[#555] dark:text-gray-300 max-w-2xl mx-auto">
            A passionate Full Stack Developer with 6+ years of experience in
            designing and implementing various web applications
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <PersonalInfo />
          <Education />
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-6 mb-6">
            <a
              href={resumeData.social.linkedin}
              className="text-3xl text-[#0077B5] hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href={resumeData.social.github}
              className="text-3xl text-[#333] dark:text-white hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href={`https://wa.me/${resumeData.social.whatsapp
                .replace(/\+/g, "")
                .replace(/\s/g, "")}`}
              className="text-3xl text-[#25D366] hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
          <a
            href={resumeData.resumeUrl}
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
            target="_blank"
            rel="noopener noreferrer"
            download="Kamod_Resume.pdf"
          >
            <i className="fas fa-download mr-2"></i> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
