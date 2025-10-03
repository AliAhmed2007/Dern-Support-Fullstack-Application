/* eslint-disable no-unused-vars */
import { motion, easeIn } from "framer-motion";
import useTheme from "../../hooks/useTheme";
import phases from "../../utils/howItWorksPhases";

// Parent container variants: all children animate together (no stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6}
  },
};

// Child variant for grid cards: animate all cards together
const cardVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.5 }
  },
};

function HowItWorks() {
    const { darkMode } = useTheme();

    return (
        <section
            className={`py-20 px-6 sm:px-10 ${darkMode ? "dark:bg-dark-background" : "bg-light-background"}`}
        >
            <motion.div 
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }} // triggers once when at least half is visible
            >
                {/* Heading Section */}
                <div className="text-center mb-16">
                    <motion.h2
                        className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "dark:text-dark-primary" : "text-light-primary"}`}
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        className="text-xl text-light-secondary dark:text-dark-secondary max-w-3xl mx-auto"
                    >
                        For personal or small business use - Pick a plan that meets your needs and budget
                    </motion.p>
                </div>

                {/* Process Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                >
                    {phases.map((phase) => (
                        <motion.div
                            key={phase.id}
                            variants={cardVariants}
                            whileHover={{ scale: 1.025 }} // Retains the hover effect
                            className={`p-8 rounded-2xl ${darkMode
                                ? "dark:bg-dark-surface-secondary dark:shadow-dark-custom"
                                : "shadow-light-custom bg-light-surface-secondary"
                                } transition-all`}
                        >
                            <div className="w-40 h-40 rounded-xl flex items-center justify-center mb-6">
                                <img src={phase.icon} alt={phase.title} />
                            </div>
                            <h3
                                className={`text-2xl font-semibold mb-4 ${darkMode
                                    ? "dark:text-dark-primary-color"
                                    : "text-light-primary-color"
                                    }`}
                            >
                                {phase.title}
                            </h3>
                            <p className={darkMode ? "dark:text-dark-secondary" : "text-light-secondary"}>
                                {phase.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Description */}
                <motion.p
                    className={`text-center max-w-4xl mx-auto ${darkMode ? "dark:text-dark-secondary" : "text-light-secondary"}`}
                >
                    Our plans include unlimited support for one primary device (add more if needed) and all your secondary devices - tablets, smartphones, routers, and printers. PC/Mac, Android/iOS - we support them all!
                </motion.p>
            </motion.div>
        </section>
    );
}

export default HowItWorks;
