import { motion } from 'framer-motion'

function DeviceInfo({ darkMode, deviceName, generalProblem, specificProblem }) {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    return (
        <motion.div
            variants={itemVariants}
            className={`mb-8 p-4 rounded-lg ${darkMode
                ? 'bg-dark-surface-secondary'
                : 'bg-light-surface-secondary'
                }`}
        >
            <h2 className="text-2xl font-semibold mb-4">Device Information</h2>
            <div className="flex justify-between flex-col gap-3">
                <div className='flex gap-2'>
                    <p className="font-semibold">Device Name:</p>
                    <p>{deviceName}</p>
                </div>
                <div className='flex gap-2'>
                    <p className="font-semibold">Problem Statement:</p>
                    <p>{generalProblem}</p>
                </div>
                <div className='flex gap-2'>
                    <p className="font-semibold">Problem Description:</p>
                    <p>{specificProblem}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default DeviceInfo


