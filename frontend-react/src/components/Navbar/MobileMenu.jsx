/* eslint-disable no-unused-vars */
// components/MobileMenu.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import dropDownItems from '../../utils/dropDownItems';

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const { darkMode } = useTheme();
  const [openAccordion, setOpenAccordion] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`absolute left-0 right-0 top-full w-full ${
            darkMode ? 'dark:bg-dark-surface-primary' : 'bg-light-surface-primary'
          } shadow-lg`}
        >
          <div className="container mx-auto px-6 py-4">
            {Object.entries(dropDownItems).map(([key, items]) => (
              <div key={key} className={`${darkMode ? 'border-color-dark' : 'border-light'} last:border-0`}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === key ? null : key)}
                  className={`cursor-pointer w-full py-3 text-left flex justify-between items-center ${
                    darkMode ? 'dark:text-dark-primary' : 'text-light-primary'
                  }`}
                >
                  <span className="capitalize">{key}</span>
                  <motion.span
                    animate={{ rotate: openAccordion === key ? 180 : 0 }}
                    className="text-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openAccordion === key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4"
                    >
                      {items?.map((item) => (
                        <a
                          key={item.key}
                          href={item.redirectTo}
                          className={`block py-2 transition-all duration-450 ease-out rounded-2xl ${
                            darkMode
                              ? 'dark:text-dark-secondary hover:pl-3 hover:dark:bg-dark-surface-secondary'
                              : 'text-light-secondary hover:pl-3 hover:bg-light-surface-secondary'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu