import { motion } from 'framer-motion';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function SpecificProblemItem({icon = null, specificProblemId, specificProblemName, darkMode}) {
    const variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };
  const navigate = useNavigate();

    const handleSpecificSelection = (e) => {    
        const specificProblemId = e.currentTarget.dataset.specificproblemid;
        localStorage.setItem('specificProblemId', specificProblemId)
        navigate(`../device-data?specificProblem=${specificProblemName}`)
    }

    return (
        <motion.div
            onClick={handleSpecificSelection}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            data-specificproblemid={specificProblemId}
            className={`mb-5 cursor-pointer gap-3 w-full rounded-xl flex items-center justify-start p-4 transition-all duration-150 
        ${darkMode
                    ? 'border border-gray-600 bg-gray-800 hover:border-gray-500'
                    : 'border border-gray-400 bg-white hover:border-gray-500 shadow-sm'}`}
        >
            <span>{icon}</span>
            <span className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {specificProblemName}
            </span>
        </motion.div>)
}

export default SpecificProblemItem