import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Collapse, Divider, Button, Tooltip } from 'antd';
import { 
  TeamOutlined, 
  HistoryOutlined, 
  QuestionCircleOutlined, 
  RocketOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import useTheme from '../hooks/useTheme';

function AboutUs() {
  const { darkMode } = useTheme();
  const [scrolled, setSrolled] = useState(false);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSrolled(true);
      } else {
        setSrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Theme-aware classes
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const textPrimaryClass = darkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const surfacePrimaryClass = darkMode ? 'bg-gray-800' : 'bg-gray-100';
  const surfaceSecondaryClass = darkMode ? 'bg-gray-700' : 'bg-gray-50';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const shadowClass = darkMode 
    ? (scrolled ? 'shadow-lg shadow-gray-900/50' : '') 
    : (scrolled ? 'shadow-lg shadow-gray-300/50' : '');
  const accentClass = darkMode ? 'text-blue-400' : 'text-blue-600';
  const btnPrimaryClass = darkMode 
    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
    : 'bg-blue-600 hover:bg-blue-700 text-white';
  
  // FAQ items
  const faqItems = [
    {
      key: '1',
      label: 'What services do you offer?',
      children: (
        <p className={textSecondaryClass}>
          We offer a comprehensive range of digital solutions including web development, 
          mobile app development, cloud services, UI/UX design, and digital transformation 
          consulting. Our team specializes in creating custom solutions tailored to your 
          specific business needs.
        </p>
      )
    },
    {
      key: '2',
      label: 'How long has your company been in business?',
      children: (
        <p className={textSecondaryClass}>
          Our company was founded in 2010, giving us over 15 years of experience in the 
          technology industry. Throughout this time, we've successfully completed over 500 
          projects for clients ranging from startups to Fortune 500 companies.
        </p>
      )
    },
    {
      key: '3',
      label: 'What makes your company different from competitors?',
      children: (
        <p className={textSecondaryClass}>
          What sets us apart is our commitment to innovation, quality, and client success. 
          We combine technical excellence with a deep understanding of business needs, 
          creating solutions that not only meet technical specifications but also drive 
          real business outcomes. Our dedicated team of experts works closely with each 
          client to ensure exceptional results.
        </p>
      )
    },
    {
      key: '4',
      label: 'What technologies do you specialize in?',
      children: (
        <p className={textSecondaryClass}>
          We specialize in a wide range of modern technologies including React, Angular, 
          Vue.js, Node.js, Python, AWS, Azure, Google Cloud, blockchain, AI/ML, and IoT. 
          Our team continuously stays updated with the latest technological advancements 
          to provide cutting-edge solutions.
        </p>
      )
    },
    {
      key: '5',
      label: 'How do you approach new projects?',
      children: (
        <p className={textSecondaryClass}>
          Our approach begins with a thorough discovery phase where we understand your 
          business goals, challenges, and requirements. We then move through a structured 
          process of planning, design, development, testing, and deployment. Throughout the 
          project, we maintain transparent communication and involve clients in key decisions.
        </p>
      )
    }
  ];
  
  // Values and team members data
  const values = [
    { 
      title: "Innovation", 
      description: "We constantly push boundaries to create solutions that address tomorrow's challenges.",
      icon: <RocketOutlined className="text-4xl" />
    },
    { 
      title: "Excellence", 
      description: "We commit to delivering the highest quality in everything we do.",
      icon: <TeamOutlined className="text-4xl" />
    },
    { 
      title: "Integrity", 
      description: "We build relationships based on trust, transparency and ethical conduct.",
      icon: <HistoryOutlined className="text-4xl" />
    }
  ];
  
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years in technology innovation."
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Technical genius specializing in scalable architecture."
    },
    {
      name: "Michael Rivera",
      role: "Design Director",
      bio: "Award-winning designer creating extraordinary user experiences."
    },
    {
      name: "Jamie Taylor",
      role: "Lead Developer",
      bio: "Full-stack expert with a passion for clean, efficient code."
    }
  ];
  
  return (
    <div className={`${bgClass} min-h-screen transition-all duration-300`}>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className={`relative overflow-hidden pt-24 pb-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center ${shadowClass} transition-all duration-300`}
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div 
            className="absolute inset-0 opacity-10"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            style={{ 
              backgroundImage: "url('/api/placeholder/1200/800')",
              backgroundSize: "cover"
            }}
          />
        </div>
        
        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          variants={fadeIn}
        >
          <motion.h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${textPrimaryClass}`}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            Transforming Ideas Into <span className={accentClass}>Digital Reality</span>
          </motion.h1>
          
          <motion.p className={`text-lg md:text-xl mb-10 ${textSecondaryClass} max-w-3xl mx-auto`}>
            For over a decade, we've been at the forefront of digital innovation, 
            helping businesses evolve, adapt, and thrive in an ever-changing landscape.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              type="primary" 
              size="large"
              className={`${btnPrimaryClass} px-8 py-6 flex items-center justify-center h-auto`}
            >
              Our Services
            </Button>
            <Button 
              size="large" 
              className={`border ${borderClass} ${textPrimaryClass} px-8 py-6 flex items-center justify-center h-auto`}
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDownOutlined className={`text-2xl ${accentClass}`} />
        </motion.div>
      </motion.section>
      
      {/* About Company Section */}
      <section className={`py-20 px-6 md:px-12 lg:px-24 ${surfacePrimaryClass}`}>
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textPrimaryClass}`}>
              <span className={accentClass}>About</span> Our Company
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondaryClass}`}>
              Founded with passion and driven by innovation, we're a team of creative thinkers, 
              strategic planners, and technical experts committed to excellence.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
            variants={fadeIn}
          >
            <div className="relative">
              <motion.div 
                className="rounded-lg overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Our office" 
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div 
                className={`absolute -bottom-6 -right-6 ${surfaceSecondaryClass} ${textPrimaryClass} p-4 rounded-lg shadow-lg`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="font-bold text-lg">Est. 2010</p>
                <p className={textSecondaryClass}>15+ Years of Excellence</p>
              </motion.div>
            </div>
            
            <motion.div variants={fadeIn}>
              <h3 className={`text-2xl font-bold mb-6 ${textPrimaryClass}`}>Our Story</h3>
              <p className={`mb-6 ${textSecondaryClass}`}>
                Starting from a small team of passionate developers in 2010, we've grown into 
                a full-service digital agency with a global presence. Our journey has been defined 
                by continuous learning, adaptation, and a relentless pursuit of excellence.
              </p>
              <p className={`mb-6 ${textSecondaryClass}`}>
                Through economic ups and downs, technological revolutions, and shifting market 
                demands, we've remained steadfast in our commitment to delivering exceptional 
                value to our clients. Today, we're proud to be trusted partners to businesses 
                of all sizes across various industries.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className={`px-4 py-2 rounded-full ${surfaceSecondaryClass} ${textSecondaryClass}`}>
                  500+ Projects Completed
                </div>
                <div className={`px-4 py-2 rounded-full ${surfaceSecondaryClass} ${textSecondaryClass}`}>
                  150+ Happy Clients
                </div>
                <div className={`px-4 py-2 rounded-full ${surfaceSecondaryClass} ${textSecondaryClass}`}>
                  4 Global Offices
                </div>
                <div className={`px-4 py-2 rounded-full ${surfaceSecondaryClass} ${textSecondaryClass}`}>
                  100+ Team Members
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Values */}
          <motion.div variants={fadeIn}>
            <h3 className={`text-2xl font-bold mb-12 text-center ${textPrimaryClass}`}>Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className={`${surfaceSecondaryClass} rounded-lg p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl`}
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className={`mb-4 ${accentClass} flex justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {value.icon}
                  </motion.div>
                  <h4 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>{value.title}</h4>
                  <p className={textSecondaryClass}>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Team */}
          <motion.div 
            className="mt-24"
            variants={fadeIn}
          >
            <h3 className={`text-2xl font-bold mb-12 text-center ${textPrimaryClass}`}>Meet Our Leadership</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className={`${surfaceSecondaryClass} rounded-lg overflow-hidden shadow-lg`}
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`/api/placeholder/400/400?text=${encodeURIComponent(member.name)}`} 
                      alt={member.name} 
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className={`text-lg font-bold ${textPrimaryClass}`}>{member.name}</h4>
                    <p className={`text-sm ${accentClass} mb-2`}>{member.role}</p>
                    <p className={`text-sm ${textSecondaryClass}`}>{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* FAQs Section */}
      <section className={`py-20 px-6 md:px-12 lg:px-24 ${bgClass}`}>
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textPrimaryClass}`}>
              Frequently Asked <span className={accentClass}>Questions</span>
            </h2>
            <p className={`text-lg ${textSecondaryClass}`}>
              Find answers to common questions about our services, process, and company.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Collapse 
              className={`${surfacePrimaryClass} ${borderClass}`}
              bordered={false}
              expandIconPosition="end"
              items={faqItems}
            />
            
            <motion.div 
              className="mt-12 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <p className={`mb-6 ${textSecondaryClass}`}>
                Can't find the answer you're looking for?
              </p>
              <Button 
                type="primary" 
                size="large"
                className={`${btnPrimaryClass} px-8 py-6 flex items-center justify-center h-auto mx-auto`}
              >
                Contact Our Support Team
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Innovation Section - Interactive Timeline */}
      <section className={`py-20 px-6 md:px-12 lg:px-24 ${surfaceSecondaryClass}`}>
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textPrimaryClass}`}>
              Our <span className={accentClass}>Innovation</span> Journey
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondaryClass}`}>
              Explore our technology evolution and milestones that have shaped our growth.
            </p>
          </motion.div>
          
          <motion.div 
            className="relative"
            variants={fadeIn}
          >
            {/* Timeline line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${accentClass} bg-blue-500 opacity-30`}></div>
            
            {/* Timeline items */}
            {[
              { year: '2010', title: 'Company Founded', description: 'Started with a team of 5 passionate developers' },
              { year: '2013', title: 'First Major Client', description: 'Secured partnership with Fortune 500 company' },
              { year: '2016', title: 'International Expansion', description: 'Opened offices in Europe and Asia' },
              { year: '2019', title: 'Technology Innovation Award', description: 'Recognized for breakthrough solutions' },
              { year: '2022', title: 'AI Division Launch', description: 'Expanded capabilities with dedicated AI research team' },
              { year: '2024', title: 'Sustainable Tech Initiative', description: 'Committed to carbon-neutral operations' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`relative mb-12 flex ${index % 2 === 0 ? 'justify-start pr-8 md:justify-end md:pr-0 md:pl-8' : 'justify-start pl-8'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div 
                    className={`absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${btnPrimaryClass}`}
                  ></div>
                  <Tooltip title={`${item.description}`}>
                    <motion.div 
                      className={`${surfacePrimaryClass} p-6 rounded-lg shadow-lg border ${borderClass}`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <h3 className={`text-xl font-bold mb-2 ${accentClass}`}>{item.year}</h3>
                      <h4 className={`text-lg font-semibold mb-2 ${textPrimaryClass}`}>{item.title}</h4>
                      <p className={`${textSecondaryClass}`}>{item.description}</p>
                    </motion.div>
                  </Tooltip>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            variants={fadeIn}
          >
            <Button 
              size="large"
              className={`${btnPrimaryClass} px-8 py-6 flex items-center justify-center h-auto mx-auto`}
            >
              View Full Company History
            </Button>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Client Testimonials Carousel */}
      <section className={`py-20 px-6 md:px-12 lg:px-24 ${bgClass}`}>
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textPrimaryClass}`}>
              What Our <span className={accentClass}>Clients</span> Say
            </h2>
            <p className={`text-lg ${textSecondaryClass}`}>
              Don't just take our word for it — hear from the businesses we've helped transform.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={fadeIn}
          >
            {[
              { 
                quote: "Working with this team transformed our business. Their technical expertise and strategic guidance helped us achieve goals we thought were years away.", 
                author: "Sarah J.", 
                company: "FinTech Innovations"
              },
              { 
                quote: "The attention to detail and commitment to quality is unmatched. They don't just build what you ask for — they improve upon your vision.", 
                author: "Marcus T.", 
                company: "Healthcare Solutions"
              },
              { 
                quote: "From concept to execution, their process is smooth, transparent, and highly effective. The results speak for themselves.", 
                author: "Rachel L.", 
                company: "Retail Evolution"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className={`${surfacePrimaryClass} p-8 rounded-lg shadow-lg border ${borderClass}`}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 text-yellow-500">
                  {"★".repeat(5)}
                </div>
                <p className={`${textSecondaryClass} mb-6 italic`}>"{testimonial.quote}"</p>
                <div>
                  <p className={`font-semibold ${textPrimaryClass}`}>{testimonial.author}</p>
                  <p className={`text-sm ${accentClass}`}>{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
      
      {/* Call to Action */}
      <motion.section 
        className={`py-20 px-6 md:px-12 lg:px-24 ${btnPrimaryClass} text-white`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Digital Journey?</h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Let's transform your ideas into reality. Contact us today for a free consultation 
            and discover how our expertise can drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="large" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 flex items-center justify-center h-auto"
            >
              Schedule Consultation
            </Button>
            <Button 
              ghost
              size="large" 
              className="border-white hover:bg-blue-700 px-8 py-6 flex items-center justify-center h-auto"
            >
              View Our Portfolio
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default AboutUs;