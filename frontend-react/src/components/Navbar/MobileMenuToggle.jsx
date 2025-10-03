/* eslint-disable no-unused-vars */
// components/MobileMenuToggle.tsx
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';

const iconVariants = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
  exit: { rotate: -90 }
};

export const MobileMenuToggle = ({ isOpen, toggle }) => {
  const {darkMode} = useTheme()
  return (
    <motion.button
      onClick={toggle}
      className="lg:hidden z-60 p-2 cursor-pointer"
      whileTap={{ scale: 0.95 }}
    >
      {isOpen ? (
        <motion.svg
          key="close"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`size-6 ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}
          variants={iconVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </motion.svg>
      ) : (
        <motion.svg
          key="menu"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`size-6 ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}
          variants={iconVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
          exit='exit'
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </motion.svg>
      )}
    </motion.button>
  )
};