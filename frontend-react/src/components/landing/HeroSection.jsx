import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';
import landingRobot from '../../assets/images/landingRobot.png';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

export default function HeroSection() {
    const { darkMode = true } = useTheme();

    return (
        <section
            className={`relative min-h-screen overflow-hidden ${darkMode ? 'opacity-90' : 'bg-light-surface-primary'
                }`}
            style={{
                backgroundImage: `url(${landingRobot})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: darkMode ? 'multiply' : 'normal',
            }}
        >
            {/* Hero Content and CTA */}
            <div className="relative z-20 flex items-center justify-center h-full mt-5">
                <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center space-y-6"
                    >
                        <p
                            className={`text-lg sm:text-xl font-semibold ${darkMode ? 'text-dark-primary-color' : 'text-light-accent-color'
                                }`}
                        >
                            Your Trusted IT Partner
                        </p>
                        <h1
                            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold max-w-2xl sm:ml-11 sm:mt-1 ${darkMode ? 'text-dark-primary' : 'text-light-primary-color'
                                }`}
                        >
                            Expert IT Support Tech Solutions
                        </h1>
                        <p
                            className={`text-base sm:text-lg md:text-xl max-w-lg mt-5 sm:ml-11 sm:mt-15 ${darkMode ? 'text-dark-accent-color' : 'text-light-accent-color'
                                }`}
                        >
                            24/7 hardware and software support with instant ticket booking and real-time progress tracking.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-20 mt-10.75 ml-10">
                            <MotionLink
                                to="/book-ticket"
                                whileHover={{ scale: 1.05 }}
                                className={`px-6 py-2 rounded-lg transition-colors duration-450 ease-in-out ${darkMode
                                    ? 'dark:bg-dark-surface-secondary dark:text-dark-primary shadow-dark-custom hover:bg-dark-primary-color'
                                    : 'bg-light-surface-secondary text-light-primary shadow-light-custom hover:bg-light-primary-color'
                                    }`}
                            >Get Started</MotionLink>

                            <MotionLink
                                to="/book-ticket"
                                whileHover={{ scale: 1.05 }}
                                className={`px-6 py-2 rounded-lg transition-colors duration-450 ease-in-out ${darkMode
                                    ? 'dark:bg-dark-surface-secondary dark:text-dark-primary shadow-dark-custom hover:bg-dark-accent-color'
                                    : 'bg-light-surface-secondary text-light-primary shadow-light-custom hover:bg-light-accent-color'
                                    }`}
                            >Learn More</MotionLink>
                        </div>
                    </motion.div>
                </div>
            </div >
        </section >
    );
}