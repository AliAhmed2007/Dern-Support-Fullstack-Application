// components/Navbar.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import NavbarItem from './Navbar/NavbarItem';
import { MobileMenuToggle } from './Navbar/MobileMenuToggle';
import MobileMenu from './Navbar/MobileMenu';
import logo from "../assets/icons/logo.png";
import useAuth from '../hooks/useAuth';
import UserProfile from './Navbar/UserProfile';
const MotionLink = motion(Link);

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { authUser } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky w-full top-0 z-50 backdrop-blur-lg transition-all duration-300 ${darkMode
        ? `dark:bg-dark-surface-primary/90 ${isScrolled ? 'dark:shadow-dark' : 'dark:shadow-scrolled-dark'}`
        : `bg-light-surface-primary/90 ${isScrolled ? 'shadow-light' : 'shadow-scrolled-light'}`
        } ${isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-lg'}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`text-xl font-bold ${darkMode ? 'dark:text-dark-primary' : 'text-light-primary'}`}
        >
          <Link to='/' className='flex justify-center items-center cursor-pointer'>
            <img src={logo} alt="Dern Support" className='hidden  w-[150px] mt-[-30px] mr-[-30px] ml-[-45px] sm:inline' /> Dern Support
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavbarItem title="Services" menuKey="services" />
          <NavbarItem title="Tickets & Plans" menuKey="tickets" />
          <NavbarItem title="Company" menuKey="company" />
        </div>

        {/* Mobile Toggle and CTAs */}
        <div className="flex items-center gap-4">
          <MobileMenuToggle isOpen={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full cursor-pointer ${darkMode
              ? 'dark:bg-dark-surface-secondary dark:text-dark-primary'
              : 'bg-light-surface-secondary text-light-primary'
              }`}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </motion.button>

          <MotionLink
            to="/repair-request"
            whileHover={{ scale: 1.05 }}
            className={`hidden sm:flex px-6 py-2 rounded-full ${darkMode
              ? 'dark:bg-dark-surface-secondary dark:text-dark-primary shadow-dark-custom'
              : 'bg-light-surface-secondary text-light-primary shadow-light-custom'
              }`}
          >
            Start a Repair
          </MotionLink>
          {
            authUser.isAuthenticated
              ? (
                <UserProfile />
              ) : (
                <MotionLink
                  to={"/login"}
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-2 rounded-full ${darkMode
                    ? ' dark:text-dark-primary dark:bg-dark-primary-color shadow-dark-custom'
                    : 'bg-light-primary-color text-dark-primary shadow-light-custom'
                    }`}
                >
                  Login
                </MotionLink>
              )
          }
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </motion.header>
  );
}