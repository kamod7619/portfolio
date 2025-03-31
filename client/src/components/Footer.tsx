const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Skills', href: '#skills' },
    { title: 'Experience', href: '#experience' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/kamod-shakya-ind-26520b134/', ariaLabel: 'LinkedIn' },
    { icon: 'fab fa-github', href: 'https://github.com/kamod7619', ariaLabel: 'GitHub' },
    { icon: 'fab fa-whatsapp', href: 'https://wa.me/919598132392', ariaLabel: 'WhatsApp' },
  ];

  return (
    <footer className="bg-[#333] dark:bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-2xl font-bold font-poppins">
              <span className="text-primary">&lt;</span>Kamod<span className="text-primary">/&gt;</span>
            </a>
          </div>
          
          <div className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} Kamod Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
