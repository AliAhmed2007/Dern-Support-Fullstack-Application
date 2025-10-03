// components/Navbar/UserProfile.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import useTheme from '../../hooks/useTheme';
import UserProfileMenu from './UserProfileMenu';
import useUserProfile from '../../hooks/useUserProfile';

function UserProfile() {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { userProfile, loadUserProfile } = useUserProfile()

  useEffect(() => {
    if (!userProfile.isLoading) {
      loadUserProfile()
    }
  }, [userProfile, loadUserProfile])

  const avatarUrl = userProfile.userData.avatar
  const userType = userProfile.userData.userType

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);


  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        title='Your Profile'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {
          avatarUrl ? (
            <img
              src={`http://127.0.0.1:8000/api/${avatarUrl}`}
              className={`h-10 w-10 rounded-full cursor-pointer transition-colors ${darkMode
                ? 'dark:bg-dark-surface-secondary dark:text-dark-primary'
                : 'bg-light-surface-secondary text-light-primary'
                }`}
            />
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${darkMode
                ? 'dark:bg-dark-surface-secondary dark:text-dark-primary'
                : 'bg-light-surface-secondary text-light-primary'
                }`}
            >
              <UserOutlined className="text-lg" />
            </motion.button>
          )}
        <span className={`text-sm ${darkMode ? 'dark:text-dark-primary' : 'text-light-primary'}`}>
          {
            userType === 'business'
              ? (<span>{userProfile.userData.businessName} <DownOutlined  className={`transition duration-300 text-xs ${isOpen && 'rotate-180'}`}/> </span>)
              : (<span>{userProfile.userData.firstName} <DownOutlined className={`transition duration-300 text-xs ${isOpen && 'rotate-180'}`}/> </span>)
          }
        </span>
      </motion.div>

      <AnimatePresence>
        {isOpen && <UserProfileMenu
          setIsOpen={setIsOpen}
          email={userProfile.userData.email}
          name={`${userProfile.userData.firstName} ${userProfile.userData.lastName}`}
          darkMode={darkMode}
        />}
      </AnimatePresence>
    </div>
  );
}

export default UserProfile;


