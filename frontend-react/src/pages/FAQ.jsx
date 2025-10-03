import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTheme from '../hooks/useTheme';

// Custom accordion component (replacing antd dependency)
const AccordionItem = ({ question, answer, isOpen, toggleOpen }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`mb-4 rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <button
        className={`w-full p-4 text-left flex justify-between items-center font-medium text-lg ${
          darkMode 
            ? `bg-gray-800 text-gray-100 ${isOpen ? 'border-b border-gray-700' : ''}` 
            : `bg-gray-50 text-gray-900 ${isOpen ? 'border-b border-gray-200' : ''}`
        }`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl"
        >
          ↓
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className={`p-4 text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { darkMode } = useTheme();
  const [openItems, setOpenItems] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Define FAQs by sections
  const faqData = [
    {
      section: 'General Information',
      faqs: [
        {
          question: 'What is Dern Support?',
          answer:
            'Dern Support is a leading IT technical support and IT solutions company that provides comprehensive IT assistance, proactive maintenance, and innovative solutions to keep your business running smoothly.',
        },
        {
          question: 'Where are you located?',
          answer:
            'We are headquartered in a major technology hub and offer services globally through remote support and on-site services when necessary.',
        },
        {
          question: 'How can I contact support?',
          answer:
            'You can reach our support team via phone, email, or our online chat system available on our website during business hours.',
        },
      ],
    },
    {
      section: 'Our Services',
      faqs: [
        {
          question: 'What IT services do you provide?',
          answer:
            'Our services include technical support, network management, cybersecurity, cloud solutions, hardware repair, and general IT consulting.',
        },
        {
          question: 'Do you offer remote support?',
          answer:
            'Yes, we provide remote troubleshooting and support services to help resolve issues quickly without the need for on-site visits.',
        },
        {
          question: 'Can you help with cloud migration?',
          answer:
            'Absolutely. Our experts can help design, plan, and execute a seamless migration to cloud-based solutions tailored to your business needs.',
        },
      ],
    },
    {
      section: 'Pricing & Plans',
      faqs: [
        {
          question: 'What are your pricing models?',
          answer:
            'We offer flexible pricing models including subscription-based services and pay-as-you-go options to suit businesses of all sizes.',
        },
        {
          question: 'Do you offer discounts for long-term contracts?',
          answer:
            'Yes, we provide attractive discounts for clients who enter into long-term service agreements with us.',
        },
      ],
    },
    {
      section: 'Technical Support',
      faqs: [
        {
          question: 'How fast is your response time?',
          answer:
            'Our average response time is within 30 minutes during business hours, ensuring you receive prompt assistance when you need it.',
        },
        {
          question: 'Do you support on-site repair services?',
          answer:
            'Yes, if remote support is not sufficient, our professional technicians are available for on-site repairs and maintenance.',
        },
      ],
    },
    {
      section: 'Security & Compliance',
      faqs: [
        {
          question: 'How do you ensure data security?',
          answer:
            'We adhere to industry best practices, utilizing encryption, secure protocols, and regular audits to ensure your data is protected at all times.',
        },
        {
          question: 'Can you help with compliance standards?',
          answer:
            'Yes, we assist our clients in meeting various compliance standards such as GDPR, HIPAA, and others, through tailored IT security strategies.',
        },
      ],
    },
  ];

  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Scroll to section effect
  useEffect(() => {
    if (activeSection !== null) {
      const element = document.getElementById(`section-${activeSection}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection]);

  const toggleAccordion = (sectionIndex, itemIndex) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isOpen = (sectionIndex, itemIndex) => {
    const key = `${sectionIndex}-${itemIndex}`;
    return !!openItems[key];
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Hero Section */}
      <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} py-16`}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-blue-800'}`}>
              Frequently Asked Questions
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Find answers to commonly asked questions about Dern Support and our IT services
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Navigation Section */}
        <div className={`mb-12 ${isMobile ? 'overflow-x-auto' : ''}`}>
          <div className={`flex ${isMobile ? 'flex-nowrap' : 'flex-wrap justify-center'} gap-3 md:gap-6`}>
            {faqData.map((section, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setActiveSection(index)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeSection === index
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {section.section}
              </motion.button>
            ))}
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-16">
          {faqData.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              id={`section-${sectionIndex}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center mb-6">
                <div className={`h-8 w-1 rounded ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} mr-3`}></div>
                <h2 className="text-2xl md:text-3xl font-bold">{section.section}</h2>
              </div>
              
              <div className="ml-0 md:ml-4">
                {section.faqs.map((faq, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={isOpen(sectionIndex, itemIndex)}
                    toggleOpen={() => toggleAccordion(sectionIndex, itemIndex)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`mt-20 p-8 rounded-xl text-center ${
            darkMode ? 'bg-gray-800' : 'bg-blue-50'
          }`}
        >
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Our friendly support team is here to help. Contact us directly and we'll get back to you promptly.
          </p>
          <button className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            darkMode 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}>
            Contact Support
          </button>
        </motion.div>
      </div>
      
      {/* Back to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  );
};

export default FAQ;