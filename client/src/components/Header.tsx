import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { title: "Home", href: "#home" },
    { title: "About", href: "#about" },
    { title: "Skills", href: "#skills" },
    { title: "Experience", href: "#experience" },
    { title: "Projects", href: "#projects" },
    { title: "Extra", href: "#extra-curricular" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed w-full bg-background z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <a
            href="#home"
            className="text-2xl font-bold font-poppins text-foreground"
          >
            <span className="text-primary">&lt;</span>Kamod
            <span className="text-primary">/&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="nav-link text-foreground hover:text-primary font-medium transition-colors"
              >
                {link.title}
              </a>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                ))}
            </button>
          </div>

          {/* Mobile Navigation Toggle & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                ))}
            </button>

            <button
              className="text-foreground focus:outline-none p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-background shadow-lg ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block py-2 text-foreground hover:text-primary font-medium"
              onClick={closeMenu}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
