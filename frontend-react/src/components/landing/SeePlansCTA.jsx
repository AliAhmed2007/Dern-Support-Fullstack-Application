import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

function SeePlansCTA() {
    const { darkMode } = useTheme();

    return (
        <section
            className={`p-10 text-center flex items-center justify-center gap-4 ${darkMode
                    ? "dark:bg-dark-primary-color text-dark-primary"
                    : "bg-light-primary-color text-white"
                }`}
        >
            {/* Text fades in smoothly */}
            <motion.span
                className="font-black text-5xl tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
            >
                Ready To See Plans?
            </motion.span>

            {/* Button slides in from the right when it enters the viewport */}
            <MotionLink
                to="/plans-subscriptions"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut"}}
                viewport={{ once: true }}
                className={`px-6 py-2 rounded-full text-xl tracking-wide mt-2 ${darkMode
                        ? "dark:text-dark-primary dark:bg-dark-accent-color shadow-dark-custom"
                        : "bg-light-accent-color shadow-light-custom"
                    }`}
            >
                Show Me
            </MotionLink>
        </section>
    );
}

export default SeePlansCTA;
