import { useEffect, useState } from "react";
import profileImg from "../../../attached_assets/profileImg.jpeg";

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`inline-block transition-all duration-700 ${className} ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {text}
    </span>
  );
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Completely reset the typing animation implementation
  const [typedText, setTypedText] = useState("");
  const fullText = "Full Stack Developer";

  useEffect(() => {
    setIsVisible(true);

    // Reset and implement typing animation from scratch
    setTypedText(""); // Clear any existing text
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen pt-24 bg-[#f8f9fa] dark:bg-[#111827] text-[#333] dark:text-white flex items-center relative overflow-hidden"
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-60 h-60 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-yellow-300 opacity-10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-4 overflow-hidden">
              <AnimatedText text="Hi, I'm " delay={300} />
              <AnimatedText
                text="Kamod Kumar"
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600"
                delay={600}
              />
            </h1>

            <h2 className="text-2xl md:text-3xl font-light mb-6 flex items-center">
              <span className="mr-1">{typedText}</span>
              <span
                className={`inline-block w-[2px] h-6 bg-primary animate-pulse ${
                  typedText.length === fullText.length
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              ></span>
            </h2>

            <div
              className={`text-lg text-[#555] dark:text-gray-300 mb-8 max-w-lg transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <p>
                A highly skilled Full Stack Developer with over 6+ years of
                experience in designing and implementing web applications in
                LAMP (Linux, Apache, MySQL, PHP) and WAMP (Windows, Apache,
                MySQL, PHP) environments. Passionate about clean, efficient code
                and creating seamless user experiences.
              </p>
            </div>

            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <a
                href="#contact"
                className="inline-block bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="inline-block bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-[#333] dark:text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                View My Work
              </a>
            </div>
          </div>

          <div
            className={`md:w-1/2 flex justify-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl animate-float">
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-transparent"></div>
              <img
                src={profileImg}
                alt="Kamod Kumar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<div class="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center"><span class="text-gray-600 dark:text-gray-300 font-medium">KK</span></div>';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
