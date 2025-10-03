import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DownOutlined } from '@ant-design/icons';
import useTheme from '../../hooks/useTheme';
import dropDownItems from '../../utils/dropDownItems';
import DropDownMenu from './DropDownMenu';

const NavbarItem = ({ title, menuKey }) => {
  const { darkMode } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${darkMode
            ? 'text-gray-200 hover:bg-gray-700'
            : 'text-gray-800 hover:bg-gray-200'
          }`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs flex items-center"
        >
          <DownOutlined />
        </motion.span>
      </motion.div>

      {/* Custom dropdown menu */}
      <div className="absolute top-full left-0 w-max z-50">
        {open && <DropDownMenu items={dropDownItems[menuKey]} darkMode={darkMode} />}
      </div>
    </div>
  );
};

export default NavbarItem;
