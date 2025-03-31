import { resumeData } from '@/utils/resumeData';
import { useState, useEffect, useRef } from 'react';

const ExtraCurricular = () => {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImageVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="extra-curricular" className="py-20 bg-[#f8f9fa] dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#333] dark:text-white mb-4">Extra Curricular Activities</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-4">Certificates</h3>
            
            {resumeData.extraCurricular.certificates.map((cert, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h4 className="text-xl font-semibold text-primary mb-2">{cert.title}</h4>
                <p className="text-[#555] dark:text-gray-300">{cert.description}</p>
              </div>
            ))}
            
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-4">Additional Skills</h3>
              <ul className="list-disc pl-5 space-y-2">
                {resumeData.extraCurricular.skills.map((skill, index) => (
                  <li key={index} className="text-[#555] dark:text-gray-300">{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Extramile Certificate Image */}
          <div 
            ref={imageRef}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 overflow-hidden transition-all duration-700 ${
              isImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">Extramile Certificate</h3>
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://media.licdn.com/dms/image/v2/D562DAQHYgewIyNnwyw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1714457038172?e=1743829200&v=beta&t=NIxjlK85g5KQnATymzuvscGwJNVTgEpjQerHLUQeaOI"
                alt="Extramile Certificate"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML += '<div class="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-700"><p class="text-gray-500 dark:text-gray-400">Certificate image could not be loaded</p></div>';
                  }
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white font-medium">Extramile Certificate of Recognition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraCurricular;