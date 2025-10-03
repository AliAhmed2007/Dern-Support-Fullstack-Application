import { motion } from 'framer-motion'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import useTheme from '../hooks/useTheme'
import { Link } from 'react-router-dom';
const navigations = [
    'Home', 'About Us', 'Pricing', 'Home Support',
    'Business Support', 'FAQ', 'Legal Information', 'Contact Us'
]
const MotionLink = motion(Link);

const Footer = () => {
    const { darkMode } = useTheme()
    return (
        <footer className={`border-t ${darkMode ? 'dark:bg-dark-surface-primary dark:border-dark-border-default' : 'bg-light-surface-primary border-light-border-default'}`}>
            <div className="max-w-7xl mx-auto px-6 py-12 sm:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
                >
                    {/* Navigation Column */}
                    <div className="space-y-4">
                        <motion.h3
                            whileHover={{ scale: 1.05 }}
                            className={`text-lg font-semibold ${darkMode ? 'dark:text-dark-primary' : 'text-light-primary'}`}
                        >
                            Navigation
                        </motion.h3>
                        <div className="grid grid-cols-2 gap-4">
                            {navigations.map((item, index) => (
                                <MotionLink
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    className={`${darkMode ? 'dark:text-dark-secondary-color dark:hover:text-dark-accent-color' : 'text-light-secondary hover:text-dark-primary-color'} transition-colors`}
                                    href="#"
                                >
                                    {item}
                                </MotionLink>
                            ))}
                        </div>
                    </div>

                    {/* Tech Support Column */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className={`text-lg font-semibold ${darkMode ? 'dark:text-dark-primary' : 'text-light-primary'}`}>
                            Tech Support
                        </h3>
                        <p className={`${darkMode ? 'dark:text-dark-secondary' : 'text-light-secondary'} leading-relaxed`}>
                            Dern Support provides industry-leading technical support services to home customers
                            and small business clients with friendly and professional US-based technicians.
                        </p>
                        <p className={`${darkMode ? 'dark:text-dark-secondary' : 'text-light-secondary'} leading-relaxed`}>
                            Our team handles a wide array of tech issues and our home support plans are
                            backed by a money-back guarantee to ensure customer satisfaction.
                        </p>
                    </motion.div>

                    {/* Contact Column */}
                    <div className="space-y-6">
                        <motion.h3
                            whileHover={{ scale: 1.05 }}
                            className={`text-lg font-semibold ${darkMode ? 'dark:text-dark-primary' : 'text-light-primary'}`}
                        >
                            Contact
                        </motion.h3>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4"
                        >
                            <PhoneOutlined className={`text-xl ${darkMode ? 'dark:text-dark-accent' : 'text-dark-primary-color'}`} />
                            <Link
                                to="tel:800-516-7989"
                                className={`${darkMode ? 'dark:text-dark-secondary dark:hover:text-dark-accent-color' : 'text-light-secondary hover:text-dark-primary-color'} transition-colors`}
                            >
                                800-516-7989
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4"
                        >
                            <MailOutlined className={`text-xl ${darkMode ? 'dark:text-dark-accent' : 'text-dark-primary-color'}`} />
                            <a
                                href="mailto:support@techtous.com"
                                className={` ${darkMode ? 'dark:text-dark-secondary dark:hover:text-dark-accent-color' : 'text-light-secondary hover:text-light-primary-color'} transition-colors`}
                            >
                                support@techtous.com
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`border-t ${ darkMode ? 'dark:text-dark-secondary-color dark:border-dark-border-default' : 'border-light-border-default text-light-secondary'} mt-12 pt-8 text-center`}
                >
                    © {new Date().getFullYear()} Dern Support. All rights reserved.
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer