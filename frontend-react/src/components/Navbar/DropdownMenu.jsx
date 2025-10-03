import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const DropDownMenu = ({ items, darkMode }) => {
  return (
    <AnimatePresence>
      <motion.ul
        role="menu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`rounded-lg shadow-lg py-2 w-max ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
          }`}
      >
        {items.map((item) => (
          <li
            key={item.key}
            role="menuitem"
            className={`w-full block px-4 py-2 transition-colors duration-300 ease-in-out cursor-pointer ${darkMode
              ? 'hover:bg-dark-surface-secondary'
              : 'hover:bg-light-surface-secondary'
              }`}
            onClick={item.onClick}
          >
            <Link to={item.redirectTo}>{item.label}</Link>
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default DropDownMenu;
