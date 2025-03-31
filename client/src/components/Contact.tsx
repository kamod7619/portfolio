import { useState } from "react";
import { resumeData } from "@/utils/resumeData";
import { useToast } from "@/hooks/use-toast";

const ContactInfo = () => {
  const contactItems = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Location",
      content: resumeData.location,
    },
    { icon: "fas fa-envelope", title: "Email", content: resumeData.email },
    {
      icon: "fas fa-phone",
      title: "Phone",
      content: [resumeData.phone.split(",")[0], resumeData.phone.split(",")[1]],
    },
  ];

  return (
    <div className="md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">
        Contact Information
      </h3>

      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mr-4">
              <i className={`${item.icon} text-xl`}></i>
            </div>
            <div>
              <h4 className="font-semibold text-[#333] dark:text-white">
                {item.title}
              </h4>
              {Array.isArray(item.content) ? (
                item.content.map((line, i) => (
                  <p key={i} className="text-[#555] dark:text-gray-300">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-[#555] dark:text-gray-300">{item.content}</p>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-start">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mr-4">
            <i className="fas fa-globe text-xl"></i>
          </div>
          <div>
            <h4 className="font-semibold text-[#333] dark:text-white">
              Social Profiles
            </h4>
            <div className="flex space-x-3 mt-2">
              <a
                href="https://www.linkedin.com/in/kamod-shakya-ind-26520b134/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/kamod7619"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://wa.me/919598132392"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const emailURL = "https://saatirmind.com.my/email_api.php";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    form.append("subject", formData.subject);

    try {
      // In a real implementation, we would send this data to a server
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call

      const response = await fetch(emailURL, {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message! I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description:
            "There was an error sending your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-semibold text-[#333] dark:text-white mb-6">
        Send Me a Message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-[#555] dark:text-gray-300 mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[#555] dark:text-gray-300 mb-2"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            required
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-[#555] dark:text-gray-300 mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-[#555] dark:text-gray-300 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#f8f9fa] dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#333] dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-[#555] dark:text-gray-300 max-w-2xl mx-auto">
            Feel free to contact me for any work or suggestions
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
