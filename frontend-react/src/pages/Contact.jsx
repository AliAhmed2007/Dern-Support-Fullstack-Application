import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message, Spin } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import useTheme from '../hooks/useTheme';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactPage = () => {
  const { darkMode } = useTheme();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Company information
  const companyInfo = {
    name: 'Dern Support',
    address: '123 Tech Avenue, Innovation District, San Francisco, CA 94103',
    phone: '+1 (800) 555-7890',
    email: 'contact@dernsupport.com',
    hours: 'Monday - Friday: 8am - 8pm EST',
    website: 'www.dernsupport.com',
    location: {
      lat: 37.7749,
      lng: -122.4194 // San Francisco coordinates
    }
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    setSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', values);
      message.success('Your message has been sent! We will get back to you soon.');
      form.resetFields();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  // Contact info item component
  const ContactInfoItem = ({ icon, title, content, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`flex items-start mb-6 p-4 rounded-lg ${
        darkMode 
          ? 'bg-gray-800 hover:bg-gray-700'
          : 'bg-white hover:bg-gray-50'
      } transition-all duration-300 shadow-md`}
      whileHover={{ scale: 1.03 }}
    >
      <div className={`mr-4 text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-medium text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {title}
        </h3>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {content}
        </p>
      </div>
    </motion.div>
  );

  // Map location component - instead of Google Maps integration
  const MapLocationFallback = () => (
    <div className={`w-full h-64 md:h-80 rounded-lg overflow-hidden relative ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'
    }`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <EnvironmentOutlined className={`text-4xl mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {companyInfo.address}
        </h3>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          San Francisco, CA 94103
        </p>
        <Button 
          className={`mt-4 ${darkMode ? 'border-blue-500 text-blue-400' : 'border-blue-600 text-blue-600'}`}
          type="default"
          onClick={() => window.open(`https://maps.google.com/maps?q=${companyInfo.location.lat},${companyInfo.location.lng}&z=15`, '_blank')}
        >
          <EnvironmentOutlined /> View on Google Maps
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`w-full py-16 ${
          darkMode ? 'bg-gray-800' : 'bg-blue-50'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <Title 
              level={1}
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                darkMode ? '!text-white' : '!text-blue-800'
              }`}
            >
              Contact Us
            </Title>
            <Paragraph 
              className={`text-lg md:text-xl max-w-2xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Get in touch with our expert team for all your IT support needs
            </Paragraph>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Title 
                level={2} 
                className={`mb-6 ${darkMode ? '!text-white' : '!text-gray-800'}`}
              >
                How to Reach Us
              </Title>
              
              <div className="space-y-4">
                <ContactInfoItem 
                  icon={<PhoneOutlined />} 
                  title="Phone" 
                  content={companyInfo.phone}
                  delay={0.1}
                />
                
                <ContactInfoItem 
                  icon={<MailOutlined />} 
                  title="Email" 
                  content={companyInfo.email}
                  delay={0.2}
                />
                
                <ContactInfoItem 
                  icon={<EnvironmentOutlined />} 
                  title="Address" 
                  content={companyInfo.address}
                  delay={0.3}
                />
                
                <ContactInfoItem 
                  icon={<ClockCircleOutlined />} 
                  title="Business Hours" 
                  content={companyInfo.hours}
                  delay={0.4}
                />
                
                <ContactInfoItem 
                  icon={<GlobalOutlined />} 
                  title="Website" 
                  content={companyInfo.website}
                  delay={0.5}
                />
              </div>
            </motion.div>
            
            {/* Map Component (Fallback without Google Maps API) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8"
            >
              <Title 
                level={3} 
                className={`mb-4 ${darkMode ? '!text-white' : '!text-gray-800'}`}
              >
                Our Location
              </Title>
              
              <MapLocationFallback />
            </motion.div>
          </div>
          
          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`p-6 md:p-8 rounded-xl shadow-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <Title 
              level={2} 
              className={`mb-6 ${darkMode ? '!text-white' : '!text-gray-800'}`}
            >
              Send Us a Message
            </Title>
            
            <Paragraph 
              className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Fill out the form below and our team will get back to you as soon as possible.
            </Paragraph>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="w-full"
              validateTrigger={['onBlur', 'onChange']}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Form.Item
                  name="name"
                  label={
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                      Full Name
                    </span>
                  }
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input 
                    size="large"
                    placeholder="Enter your full name" 
                    className={
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400'
                        : 'bg-white border-gray-300'
                    }
                  />
                </Form.Item>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Form.Item
                  name="email"
                  label={
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                      Email Address
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email address' }
                  ]}
                >
                  <Input 
                    size="large"
                    placeholder="Enter your email address" 
                    className={
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400'
                        : 'bg-white border-gray-300'
                    }
                  />
                </Form.Item>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Form.Item
                  name="subject"
                  label={
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                      Subject
                    </span>
                  }
                  rules={[{ required: true, message: 'Please enter a subject' }]}
                >
                  <Input 
                    size="large"
                    placeholder="What is your inquiry about?" 
                    className={
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400'
                        : 'bg-white border-gray-300'
                    }
                  />
                </Form.Item>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Form.Item
                  name="message"
                  label={
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                      Message
                    </span>
                  }
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <TextArea 
                    rows={5} 
                    placeholder="Please provide details about your inquiry" 
                    className={
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400'
                        : 'bg-white border-gray-300'
                    }
                  />
                </Form.Item>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    size="large"
                    icon={<SendOutlined />}
                    className={`w-full h-12 text-base font-medium flex items-center justify-center ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-500 border-blue-700'
                        : 'bg-blue-600 hover:bg-blue-700 border-blue-700'
                    }`}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Form.Item>
              </motion.div>
            </Form>
          </motion.div>
        </div>
        
        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className={`mt-16 p-8 rounded-xl text-center ${
            darkMode ? 'bg-gray-800' : 'bg-blue-50'
          }`}
        >
          <Title 
            level={3} 
            className={`${darkMode ? '!text-white' : '!text-blue-800'}`}
          >
            Need Immediate Assistance?
          </Title>
          <Paragraph 
            className={`mb-6 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            For urgent technical support issues, please call our dedicated support line.
            Our technical specialists are available to assist you promptly.
          </Paragraph>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-block px-8 py-4 rounded-lg font-medium text-lg ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-500' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-all duration-300 cursor-pointer`}
          >
            <PhoneOutlined className="mr-2" /> {companyInfo.phone}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;