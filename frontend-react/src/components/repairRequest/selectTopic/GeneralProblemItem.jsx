import React from 'react';
import { motion } from 'framer-motion';

function GeneralProblemItem({
    icon = null,
    darkMode,
    generalProblemId,
    problemName,
    setOpenTopics,
    setOpenGeneralProblems
}) {
    const variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    const handleGeneralProblemSelection = (e) => {
        const generalProblemId = e.currentTarget.dataset.generalproblemid;
        const generalProblemName = e.currentTarget.dataset.generalproblemname;
        localStorage.setItem('generalProblemId', generalProblemId)
        localStorage.setItem('generalProblemName', generalProblemName)
        setOpenTopics(true)
        setOpenGeneralProblems(false)
    }

    return (
        <motion.div
            onClick={handleGeneralProblemSelection}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            data-generalproblemid={generalProblemId}
            data-generalproblemname={problemName}
            className={`mb-5 cursor-pointer gap-3 w-full rounded-xl flex items-center justify-start p-4 transition-all duration-150 
        ${darkMode
                    ? 'border border-gray-600 bg-gray-800 hover:border-gray-500'
                    : 'border border-gray-400 bg-white hover:border-gray-500 shadow-sm'}`}
        >
            <img src={icon} alt={problemName} />
            <span className={`text-xl font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {problemName}
            </span>
        </motion.div>
    );
}

export default GeneralProblemItem;
