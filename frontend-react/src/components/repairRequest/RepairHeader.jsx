import React from 'react';
import useTheme from '../../hooks/useTheme';
import { Link } from 'react-router-dom';
import { PhoneOutlined } from '@ant-design/icons';

function RepairHeader() {
  const { darkMode } = useTheme();
  
  return (
    <header
      className={`flex justify-between w-full items-center flex-col gap-3 sm:flex-row py-4 border-b ${
        darkMode ? 'border-gray-600' : 'border-gray-400'
      }`}
    >
      <h1 className={`font-bold text-2xl ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
        Repair Request
      </h1>
      <Link
        to="/contact"
        className={`flex items-center gap-2 cursor-pointer px-5 py-2 rounded-full text-white transition-colors ${
          darkMode ? 'bg-dark-primary-color' : 'bg-light-primary-color'
        }`}
      >
        <PhoneOutlined className="text-xl rotate-115 mr-[-5px]" />
        <span className="text-base">Contact Us</span>
      </Link>
    </header>
  );
}

export default RepairHeader;
